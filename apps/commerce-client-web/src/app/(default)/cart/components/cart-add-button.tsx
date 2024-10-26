'use client';

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import Link from 'next/link';
import { Product } from '@/types/product-types';
import { useLoading } from '@/components/common/loading-context';
import useCartStore from '@/stores/use-cart-store';
import { useAuthStore } from '@/stores/use-auth-store';

interface AddToCartButtonProps {
  book: Product;
  quantity: number;
}

const AddToCartButton = ({ book, quantity }: AddToCartButtonProps) => {
  const { toast } = useToast();
  const { setLoading } = useLoading();
  const { addItemToCart } = useCartStore();
  const { isLoggedIn } = useAuthStore();

  const handleAddToCart = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      // Show login prompt if user is not logged in
      toast({
        title: '로그인이 필요합니다',
        description: '장바구니에 상품을 추가하려면 로그인이 필요합니다.',
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

    try {
      setLoading(true);
      await addItemToCart(book.id, quantity);
      toast({
        title: '장바구니에 추가되었습니다!',
        description: `${book.title}이(가) 장바구니에 추가되었습니다.`,
        action: (
          <div className="mt-4 flex w-full justify-end">
            <ToastAction altText="장바구니 보기" className="border-slate-600">
              <Link href="/cart">장바구니 보기</Link>
            </ToastAction>
          </div>
        ),
        duration: 3000,
        className: 'max-w-2xl p-8 flex flex-col justify-between',
      });
    } catch (error) {
      toast({
        title: '오류 발생',
        description: '장바구니에 상품을 추가하는 데 실패했습니다. 다시 시도해 주세요.',
        duration: 3000,
      });
      console.error('장바구니 추가 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleAddToCart} variant="outline" className="w-full">
      장바구니
    </Button>
  );
};

export default AddToCartButton;
