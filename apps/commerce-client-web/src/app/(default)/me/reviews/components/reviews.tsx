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
import DeleteDialog from './delete-dialog';
import EditDialog from '@/app/(default)/me/reviews/components/edit-dialog';

const Reviews = () => {
  const { data } = useQuery({
    queryKey: ['me', 'reviews'],
    queryFn: () => getMyReviews(),
  });

  const reviews = data?.reviews ?? [];

  return (
    <div className="overflow-x-auto">
      {/* Desktop Design */}
      <div className="hidden md:block">
        <Table className="table-fixed text-xs">
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="hidden w-16 text-center md:table-cell">작성일자</TableHead>
              <TableHead className="w-12 text-center">상품</TableHead>
              <TableHead className="w-12 text-center">내용</TableHead>
              <TableHead className="w-8 text-center">점수</TableHead>
              <TableHead className="w-8 text-center">수정</TableHead>
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
                  <EditDialog review={review} />
                </TableCell>
                <TableCell className="truncate">
                  <DeleteDialog reviewId={review.reviewId} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Design */}
      <div className="flex flex-col space-y-4 md:hidden">
        {reviews.map((review) => (
          <div
            key={review.reviewId}
            className="flex flex-col rounded-lg border bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              {/* Product Info & Image */}
              <div className="flex-1 overflow-hidden">
                <Link
                  href={`/details/${review.productId}`}
                  className="block max-w-[80%] overflow-hidden truncate text-base font-bold"
                >
                  {review.productTitle}
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                {/* Edit Button */}
                <EditDialog review={review} />
                {/* Delete Button */}
                <DeleteDialog reviewId={review.reviewId} />
              </div>
            </div>
            {/* Star Rating and Date */}
            <div className="mt-2 flex items-center space-x-2 text-xs font-light">
              <StarRating rating={review.score} />
              <span className="text-gray-500">{review.createdAt}</span>
            </div>
            {/* Full Review Content */}
            <p className="mt-4 break-words text-sm font-light">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
