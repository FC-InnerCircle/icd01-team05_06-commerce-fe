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
import { MyReviewResponse } from '@/types/my-review-type';
import { queries } from '@/queries';

interface DeleteAlertDialogProps {
  reviewId: number;
}

const DeleteDialog = ({ reviewId }: DeleteAlertDialogProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteReview(reviewId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queries.me.reviews.queryKey });

      const prev = queryClient.getQueryData<MyReviewResponse>(queries.me.reviews.queryKey);

      const nextReviews = prev?.reviews.filter((v) => v.reviewId !== reviewId) ?? [];

      const next = { ...prev, reviews: nextReviews };

      queryClient.setQueryData<MyReviewResponse>(queries.me.reviews.queryKey, next);

      return { prev };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queries.me.reviews.queryKey, context?.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queries.me.reviews.queryKey });
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
