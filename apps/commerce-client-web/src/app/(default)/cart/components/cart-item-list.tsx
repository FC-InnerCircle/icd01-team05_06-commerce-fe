import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CartItem from './cart-item';
import { CartItem as CartItemType } from '@/types/cartTypes';

interface CartItemListProps {
  items: CartItemType[];
  removeAllProduct: () => void;
  toggleAllProducts: (selected: boolean) => void;
  removeProduct: (id: number) => void;
  updateProductQuantity: (id: number, quantity: number) => void;
  updateProductSelection: (id: number, selected: boolean) => void;
}

const CartItemList: React.FC<CartItemListProps> = ({
  items,
  removeAllProduct,
  toggleAllProducts,
  removeProduct,
  updateProductQuantity,
  updateProductSelection,
}) => {
  const allSelected = items.every((item) => item.selected);

  return (
    <div className="overflow-x-auto">
      <Button onClick={removeAllProduct}>전체삭제</Button>
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => toggleAllProducts(e.target.checked)}
                className="cursor-pointer"
              />
            </TableHead>
            <TableHead>상품 정보</TableHead>
            <TableHead>수량</TableHead>
            <TableHead>주문 금액</TableHead>
            <TableHead>배송 정보</TableHead>
            <TableHead>삭제</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              removeProduct={removeProduct}
              updateProductQuantity={updateProductQuantity}
              updateProductSelection={updateProductSelection}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CartItemList;
