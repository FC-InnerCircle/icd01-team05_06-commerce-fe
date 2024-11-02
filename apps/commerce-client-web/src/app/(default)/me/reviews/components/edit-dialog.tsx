'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MyReview, MyReviewResponse } from '@/types/my-review-type';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { queries } from '@/queries';
import { editReview } from '@/app/actions/my-review-action';

interface EditDialogProps {
  review: MyReview;
}

const EditDialog = ({ review }: EditDialogProps) => {
  const [content, setContent] = useState(review.content);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => editReview({ reviewId: review.reviewId, content, score: review.score }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queries.me.reviews.queryKey });

      const prev = queryClient.getQueryData<MyReviewResponse>(queries.me.reviews.queryKey);

      const nextReviews =
        prev?.reviews.map((v) =>
          v.reviewId === review.reviewId ? { ...v, content, score: v.score } : v,
        ) ?? [];

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-2 text-xs">
          수정
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>수정</DialogTitle>
        </DialogHeader>
        <Textarea
          className="resize-none"
          placeholder="리뷰를 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => mutate()}>수정</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
