'use client';
import React from 'react';
import CartItemList from './components/cart-item-list';
import CartSummary from './components/cart-summary';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import useCartStore from '@/stores/useCartStore';

const CartPage: React.FC = () => {
  const {
    items,
    removeAllProduct,
    toggleAllProducts,
    removeProduct,
    updateProductQuantity,
    updateProductSelection,
  } = useCartStore();

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-3xl font-bold">이너 카트</h1>
      <CartItemList
        items={items}
        removeAllProduct={removeAllProduct}
        toggleAllProducts={toggleAllProducts}
        removeProduct={removeProduct}
        updateProductQuantity={updateProductQuantity}
        updateProductSelection={updateProductSelection}
      />
      <div className="mt-4 flex justify-end">
        <CartSummary items={items} />
      </div>
      <Button asChild className="w-full">
        <Link href="/order">주문하기</Link>
      </Button>
    </div>
  );
};

export default CartPage;
