import { Dialog, DialogContent, DialogHeader, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Link from 'next/link';

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose }) => {
  const handleClick = (route: string) => {
    // router.push(route);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-2xl font-semibold text-center mb-10">로그인</h2>
        </DialogHeader>

        <form action="" method="post" target="hidden_frame" className="space-y-6">
          <div className="space-y-4">
            <Input title="이메일" type="email" name="uid" placeholder="이메일" className="w-full" />
            <Input
              title="비밀번호"
              name="passwd"
              type="password"
              placeholder="비밀번호"
              autoComplete="off"
              className="w-full"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox name="auto_login" data-type="use" value="ok" defaultChecked />
            <span className="text-sm">로그인상태유지</span>
          </div>

          <Button type="submit" className="w-full" size="lg">
            로그인
          </Button>
        </form>

        <nav className="flex justify-center mt-4 gap-x-5">
          <Link href="#">
            <span className="text-sm text-blue-500 hover:underline">회원가입</span>
          </Link>
          <Link href="#">
            <span className="text-sm text-blue-500 hover:underline">아이디 · 비밀번호 찾기</span>
          </Link>
        </nav>

        <div className="relative my-8 flex items-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <span className="relative text-sm bg-white px-4 text-gray-500 mx-auto">또는</span>
        </div>

        <Button
          type="submit"
          variant="secondary"
          className="w-full"
          size="lg"
          onClick={() => handleClick('#')}
        >
          비회원 주문배송 조회
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
