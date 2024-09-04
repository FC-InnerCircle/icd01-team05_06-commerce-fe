import React from 'react';
import { CartItem as CartItemType } from '@/types/cartTypes';

interface CartSummaryProps {
  items: CartItemType[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
  const totalPrice = items
    .filter((item) => item.selected)
    .reduce((acc, item) => acc + parseInt(item.price, 10) * item.selectNum, 0)
    .toLocaleString();

  return (
    <div className="mt-8 flex justify-end">
      <div className="text-right">
        <div className="mb-2 text-lg font-semibold">
          총 주문 상품 {items.filter((item) => item.selected).length}개
        </div>
        <div className="text-2xl font-bold">{totalPrice}원</div>
      </div>
    </div>
  );
};

export default CartSummary;
