'use client';

import { useSearchParams } from 'next/navigation';
import CustomPagination from '@/components/common/custom-pagenation';
import { Product } from '@/types/product-types';
import { Pagination } from '@/types/pagination-types';
import SearchResult from './search-result';
import { BookOpen } from 'lucide-react'; // Icon for empty state

interface ProductListProps {
  books: Product[];
  pagination: Pagination | null;
}

const ProductList = ({ books, pagination }: ProductListProps) => {
  const searchParams = useSearchParams();

  const generatePageLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update or add the page parameter
    params.set('page', page.toString());

    return `?${params.toString()}`;
  };

  return (
    <div>
      {books.length > 0 ? (
        <>
          <SearchResult books={books} />
          {pagination && (
            <CustomPagination
              currentPage={pagination.currentPage}
              totalPage={pagination.totalPage}
              hasNext={pagination.hasNextPage}
              hasPrev={pagination.hasPreviousPage}
              generatePageLink={generatePageLink} // Use the modified function
            />
          )}
        </>
      ) : (
        // UI when no products are available
        <div className="flex flex-col items-center justify-center rounded-lg bg-slate-100 p-8 lg:min-h-96">
          <BookOpen className="size-12 text-slate-400" />
          <h2 className="mt-4 text-lg font-semibold text-slate-600">상품이 없습니다.</h2>
          <p className="mt-2 text-sm text-slate-500">
            다른 조건으로 검색해 보시거나 카테고리를 선택해 주세요.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
