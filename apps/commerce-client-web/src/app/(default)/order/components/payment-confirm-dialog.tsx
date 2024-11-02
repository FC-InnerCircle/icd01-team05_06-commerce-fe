import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface PaymentConfirmationDialogProps {
  isOpen: boolean;
  orderNumber: string | null;
  orderedBooks: { title: string; quantity: number }[];
  onClose: () => void;
}

const PaymentConfirmationDialog = ({
  isOpen,
  orderNumber,
  orderedBooks,
  onClose,
}: PaymentConfirmationDialogProps) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>주문이 성공적으로 완료되었습니다!</DialogTitle>
      </DialogHeader>
      {orderNumber && (
        <p className="mb-4">
          주문 번호: <strong>{orderNumber}</strong>
        </p>
      )}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">책 이름</th>
            <th className="border border-gray-300 px-4 py-2">수량</th>
          </tr>
        </thead>
        <tbody>
          {orderedBooks.map((book, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{book.title}</td>
              <td className="border border-gray-300 px-4 py-2">{book.quantity}개</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button className="mt-4 w-full" onClick={onClose}>
        닫기
      </Button>
    </DialogContent>
  </Dialog>
);

export default PaymentConfirmationDialog;
