'use client';

import { Accordion } from '@/components/ui/accordion';
import PriceFilter from './price-filter';
import CategoryFilter from './category-filter';
import { Product } from '@/types/product-types';

interface FilterComponentProps {
  books: Product[];
}

const FilterComponent = ({ books }: FilterComponentProps) => {
  return (
    <div className="w-full max-w-md rounded-lg border p-4">
      <Accordion type="multiple" className="w-full">
        <PriceFilter />
        <CategoryFilter books={books} />
      </Accordion>
    </div>
  );
};

export default FilterComponent;
