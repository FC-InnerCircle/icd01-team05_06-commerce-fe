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
    <DialogContent className="p-4 sm:p-6 lg:p-8">
      <DialogHeader>
        <DialogTitle className="text-base sm:text-lg lg:text-xl">
          주문이 성공적으로 완료되었습니다!
        </DialogTitle>
      </DialogHeader>
      {orderNumber && (
        <p className="mb-4 text-sm sm:text-base lg:text-lg">
          주문 번호: <strong>{orderNumber}</strong>
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm lg:text-base">
                책 이름
              </th>
              <th className="truncate border border-gray-300 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm lg:text-base">
                수량
              </th>
            </tr>
          </thead>
          <tbody>
            {orderedBooks.map((book, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm lg:text-base">
                  {book.title}
                </td>
                <td className="truncate border border-gray-300 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm lg:text-base">
                  {book.quantity}개
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button className="mt-4 w-full text-xs sm:text-sm lg:text-base" onClick={onClose}>
        닫기
      </Button>
    </DialogContent>
  </Dialog>
);

export default PaymentConfirmationDialog;
