'use client';

import { useSearchParams } from 'next/navigation';
import CustomPagination from '@/components/common/custom-pagenation';
import { Product } from '@/types/product-types';
import { Pagination } from '@/types/pagination-types';
import SearchResult from './search-result';

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
    </div>
  );
};

export default ProductList;
