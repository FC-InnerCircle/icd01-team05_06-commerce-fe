'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/use-cart-store';
import { useRouter } from 'next/navigation';
import AlertDialogComponent from '@/components/common/alert-dialog';
import { Product } from '@/types/product-types';
import { useAuthStore } from '@/stores/use-auth-store'; // Import useAuthStore
import { useToast } from '@/components/ui/use-toast'; // Import useToast for login alert
import { ToastAction } from '@/components/ui/toast';
import Link from 'next/link';

interface PaymentForOrderButtonProps {
  text: string;
  book?: Product;
}

const PaymentAddButton = ({ text, book }: PaymentForOrderButtonProps) => {
  const router = useRouter();
  const { addItemToCart } = useCartStore();
  const { isLoggedIn } = useAuthStore(); // Access login state
  const { toast } = useToast(); // Initialize toast
  const [showDialog, setShowDialog] = useState(false);
  const queryString = `productId=${book?.id}&quantity=${1}`;

  const buyOnlyOneBook = () => {
    router.push(`/order?${queryString}`);
  };

  const goPayment = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      toast({
        title: '로그인이 필요합니다',
        description: '상품을 바로 구매하려면 로그인이 필요합니다.',
        action: (
          <div className="mt-4 flex w-full justify-end">
            <ToastAction altText="로그인 페이지로 이동" className="border-slate-600">
              <Link href="/login">로그인</Link>
            </ToastAction>
          </div>
        ),
        duration: 3000,
        className: 'max-w-2xl p-8 flex flex-col justify-between',
      });
      return;
    }

    if (book && book.discountedPrice < 1) {
      alert('This product is out of stock');
      return;
    }

    const currentPath = window.location.pathname;
    const selectedProducts = [];

    if (currentPath === '/cart' && selectedProducts.length > 0) {
      router.push(`/order?${queryString}`);
    } else if (book) {
      if (selectedProducts.length > 0) {
        setShowDialog(true);
      } else {
        buyOnlyOneBook();
      }
    } else {
      alert('Please select a product.');
    }
  };

  const handleDialogConfirm = () => {
    setShowDialog(false);
    if (!book) return;
    addItemToCart(book.id, 1);
    router.push('/cart');
  };

  const handleDialogBuyJustOne = () => {
    setShowDialog(false);
    if (!book || !book.id) return;
    buyOnlyOneBook();
  };

  const handleDialogCancel = () => {
    setShowDialog(false);
  };

  return (
    <>
      <Button onClick={goPayment} className="w-full">
        {text}
      </Button>

      {/* Dialog for confirming purchase with items in cart */}
      {showDialog && (
        <AlertDialogComponent
          title="You have items in your cart"
          description="Do you want to review your cart before purchasing together?"
          onConfirm={handleDialogConfirm}
          onCancel={handleDialogCancel}
          thirdButtonName="Buy Now"
          onThirdAction={handleDialogBuyJustOne}
        />
      )}
    </>
  );
};

export default PaymentAddButton;
