'use client';

import { useCallback } from 'react';
import { XIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteReview } from '@/app/actions/my-review-action';

interface DeleteAlertDialogProps {
  reviewId: number;
}

const DeleteAlertDialog = ({ reviewId }: DeleteAlertDialogProps) => {
  const handleClick = useCallback(() => deleteReview(reviewId), [reviewId]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <XIcon className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[320px]">
        <AlertDialogHeader>
          <AlertDialogTitle>리뷰를 정말 삭제하시겠습니까?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
