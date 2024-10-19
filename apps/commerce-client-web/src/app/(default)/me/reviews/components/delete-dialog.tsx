'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
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

const DeleteDialog = ({ reviewId }: DeleteAlertDialogProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me', 'reviews'] });
    },
  });

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
          <AlertDialogAction onClick={() => mutate()}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
