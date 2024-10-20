import { getMyReviews } from '@/app/actions/my-review-action';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Reviews from '@/app/(default)/me/reviews/components/reviews';

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['me', 'reviews'],
    queryFn: getMyReviews,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-4">
        <header>나의 리뷰</header>
        <Reviews />
      </div>
    </HydrationBoundary>
  );
};

export default Page;
