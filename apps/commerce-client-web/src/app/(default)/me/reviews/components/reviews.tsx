'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import StarRating from '@/components/common/star-rating';
import { getMyReviews } from '@/app/actions/my-review-action';
import DeleteAlertDialog from './delete-alert-dialog';

const Reviews = () => {
  const { data } = useQuery({
    queryKey: ['me', 'reviews'],
    queryFn: () => getMyReviews(),
  });

  const reviews = data?.reviews ?? [];

  return (
    <div className="overflow-x-auto">
      <Table className="table-fixed text-xs">
        <TableHeader>
          <TableRow className="text-center">
            <TableHead className="hidden w-16 text-center md:table-cell">작성일자</TableHead>
            <TableHead className="w-24 text-center">상품</TableHead>
            <TableHead className="w-36 text-center">내용</TableHead>
            <TableHead className="w-8 text-center">점수</TableHead>
            <TableHead className="w-8 text-center">삭제</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.reviewId} className="text-center text-xs">
              <TableCell className="hidden truncate md:table-cell">{review.createdAt}</TableCell>
              <TableCell className="truncate">
                <Link className="text-blue-700" href={`/details/${review.productId}`}>
                  {review.productTitle}
                </Link>
              </TableCell>
              <TableCell className="truncate">{review.content}</TableCell>
              <TableCell className="truncate">
                <StarRating rating={review.score} />
              </TableCell>
              <TableCell className="truncate">
                <DeleteAlertDialog reviewId={review.reviewId} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Reviews;
