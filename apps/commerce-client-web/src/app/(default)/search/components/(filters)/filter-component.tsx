// FilterComponent.tsx
'use client';

import { Accordion } from '@/components/ui/accordion';
import PriceFilter from './price-filter';
import CategoryFilter from './category-filter';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const FilterComponent = () => {
  const router = useRouter();
  const [resetFilters, setResetFilters] = useState(false);

  const handleResetFilters = () => {
    setResetFilters(true); // Trigger reset state for child components
    router.push('/search'); // Navigate to the search page without any query parameters
  };

  const handleResetComplete = () => {
    setResetFilters(false); // Reset the state back
  };

  return (
    <div className="w-full max-w-md rounded-lg border p-4">
      <Button onClick={handleResetFilters} variant="outline" size="sm" className="w-full">
        검색 초기화
      </Button>
      <Accordion type="multiple" className="w-full">
        <PriceFilter reset={resetFilters} onResetComplete={handleResetComplete} />
        <CategoryFilter />
      </Accordion>
    </div>
  );
};

export default FilterComponent;
