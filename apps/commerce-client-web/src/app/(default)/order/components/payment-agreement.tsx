'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { usePaymentStore } from '@/stores/use-payment-store';
import { createOrder } from '@/app/actions/order-action';
import { useWithLoadingAsync } from '@/components/common/with-loading-spinner';

import { CreatedOrdersResponse } from '@/types/order-types';
import PaymentConfirmationDialog from './payment-confirm-dialog';

const PaymentAgreement = () => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [orderedBooks, setOrderedBooks] = useState<{ title: string; quantity: number }[]>([]);

  const {
    orderBooks,
    userInfo,
    shippingInfo,
    paymentMethod,
    depositorName,
    agreementInfo,
    setAgreementInfo,
    resetState,
    validate,
  } = usePaymentStore((state) => state);

  const allAgreed = agreementInfo.termsOfService && agreementInfo.privacyPolicy;
  const isButtonDisabled = !allAgreed;

  const handleAgreeAll = (checked: boolean | string) => {
    const isChecked = checked === true;
    setAgreementInfo({
      termsOfService: isChecked,
      privacyPolicy: isChecked,
      ageVerification: true,
    });
  };

  const handleIndividualAgree = (
    type: 'termsOfService' | 'privacyPolicy',
    checked: boolean | string,
  ) => {
    const isChecked = checked === true;
    setAgreementInfo({ ...agreementInfo, [type]: isChecked });
  };

  const handleOrderCreation = async (): Promise<CreatedOrdersResponse | false> => {
    if (!validate()) return false;

    const orderData = {
      products: orderBooks.map((book) => ({
        id: book.productId,
        quantity: book.quantity,
      })),
      ordererInfo: {
        name: userInfo.name,
        phoneNumber: userInfo.phone,
        email: userInfo.email,
      },
      deliveryInfo: {
        recipient: shippingInfo.recipient,
        phoneNumber: shippingInfo.phone,
        streetAddress: shippingInfo.address,
        detailAddress: shippingInfo.detailAddress,
        postalCode: shippingInfo.postalCode,
        memo: shippingInfo.memo,
      },
      paymentInfo: {
        method: paymentMethod,
        depositorName: depositorName || userInfo.name,
      },
      agreementInfo,
    };

    return await createOrder(orderData);
  };

  const wrappedOrderCreation = useWithLoadingAsync(handleOrderCreation);

  const handlePayment = async () => {
    try {
      const response = await wrappedOrderCreation();

      if (!response) return;

      if (response.orderStatus === 'COMPLETED') {
        setOrderNumber(response.orderNumber);
        setOrderedBooks(
          response.products.map((product) => ({
            title: product.name,
            quantity: product.quantity,
          })),
        );
        setIsDialogOpen(true);
      } else {
        throw new Error(response.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('주문 생성에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetState();
    router.push('/');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="border-b pb-5 text-base">동의 및 결제하기</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center">
          <Checkbox
            id="agreeAll"
            checked={allAgreed}
            onCheckedChange={(checked) => handleAgreeAll(checked)}
          />
          <Label htmlFor="agreeAll" className="ml-2 text-base text-slate-600">
            전체 동의
          </Label>
        </div>
        <div className="mb-2 ml-2 flex items-center">
          <Checkbox
            id="termsOfService"
            checked={agreementInfo.termsOfService}
            onCheckedChange={(checked) => handleIndividualAgree('termsOfService', checked)}
          />
          <Label htmlFor="termsOfService" className="ml-2 text-sm text-slate-500">
            개인정보 수집 및 이용 동의 (필수)
          </Label>
        </div>
        <div className="mb-4 ml-2 flex items-center">
          <Checkbox
            id="privacyPolicy"
            checked={agreementInfo.privacyPolicy}
            onCheckedChange={(checked) => handleIndividualAgree('privacyPolicy', checked)}
          />
          <Label htmlFor="privacyPolicy" className="ml-2 text-sm text-slate-500">
            구매조건 확인 및 결제 진행에 동의 (필수)
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={isButtonDisabled} onClick={handlePayment}>
          결제하기
        </Button>
      </CardFooter>

      <PaymentConfirmationDialog
        isOpen={isDialogOpen}
        orderNumber={orderNumber}
        orderedBooks={orderedBooks}
        onClose={handleCloseDialog}
      />
    </Card>
  );
};

export default PaymentAgreement;
