'use client';

import { useRouter } from 'next/navigation';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useEffect, useState } from 'react';

interface PriceFilterProps {
  reset: boolean;
  onResetComplete: () => void;
}

const PriceFilter = ({ reset, onResetComplete }: PriceFilterProps) => {
  const router = useRouter();
  const [selectedPrice, setSelectedPrice] = useState<string>('all');

  useEffect(() => {
    if (reset) {
      setSelectedPrice('all');
      onResetComplete(); // Notify parent that the reset is complete
    }
  }, [reset, onResetComplete]);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const priceValue = event.target.value;
    const [minPrice, maxPrice] = priceValue.split('-');

    setSelectedPrice(priceValue);

    const currentParams = new URLSearchParams(window.location.search);

    if (priceValue === 'all') {
      currentParams.delete('minPrice');
      currentParams.delete('maxPrice');
    } else {
      currentParams.set('minPrice', minPrice);
      if (maxPrice) {
        currentParams.set('maxPrice', maxPrice);
      } else {
        currentParams.delete('maxPrice');
      }
    }

    router.push(`${window.location.pathname}?${currentParams.toString()}`);
  };

  return (
    <div>
      {/* Price Filter UI */}
      <AccordionItem value="price" className="text-base">
        <AccordionTrigger>가격</AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-2">
            <li>
              <input
                type="radio"
                id="price-all"
                name="price"
                value="all"
                className="mr-2"
                checked={selectedPrice === 'all'}
                onChange={handlePriceChange}
              />
              <label htmlFor="price-all">전체</label>
            </li>
            <li>
              <input
                type="radio"
                id="price-5000"
                name="price"
                value="0-5000"
                className="mr-2"
                checked={selectedPrice === '0-5000'}
                onChange={handlePriceChange}
              />
              <label htmlFor="price-5000">5천원 이하</label>
            </li>
            <li>
              <input
                type="radio"
                id="price-10000-30000"
                name="price"
                value="10000-30000"
                className="mr-2"
                checked={selectedPrice === '10000-30000'}
                onChange={handlePriceChange}
              />
              <label htmlFor="price-10000-30000">1만원 ~ 3만원</label>
            </li>
            <li>
              <input
                type="radio"
                id="price-30000-50000"
                name="price"
                value="30000-50000"
                className="mr-2"
                checked={selectedPrice === '30000-50000'}
                onChange={handlePriceChange}
              />
              <label htmlFor="price-30000-50000">3만원 ~ 5만원</label>
            </li>
            <li>
              <input
                type="radio"
                id="price-50000"
                name="price"
                value="50000"
                className="mr-2"
                checked={selectedPrice === '50000'}
                onChange={handlePriceChange}
              />
              <label htmlFor="price-50000">5만원 이상</label>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

export default PriceFilter;
