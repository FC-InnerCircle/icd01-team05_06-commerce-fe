'use client';

import { useRouter } from 'next/navigation'; // Next.js의 useRouter 훅 가져오기
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const PriceFilter = () => {
  const router = useRouter();

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const priceValue = event.target.value;

    // 현재 URL의 쿼리 파라미터를 업데이트
    const currentParams = new URLSearchParams(window.location.search);
    if (priceValue === 'all') {
      currentParams.delete('price'); // '전체' 선택 시 price 파라미터 삭제
    } else {
      currentParams.set('price', priceValue);
    }

    // URL을 업데이트하며 페이지를 다시 로드하지 않음
    router.push(`${window.location.pathname}?${currentParams.toString()}`);
  };

  return (
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
              onChange={handlePriceChange}
            />
            <label htmlFor="price-all">전체</label>
          </li>
          <li>
            <input
              type="radio"
              id="price-0-10000"
              name="price"
              value="0-9999"
              className="mr-2"
              onChange={handlePriceChange}
            />
            <label htmlFor="price-0-10000">1만원미만</label>
          </li>
          <li>
            <input
              type="radio"
              id="price-10000-30000"
              name="price"
              value="10000-29999"
              className="mr-2"
              onChange={handlePriceChange}
            />
            <label htmlFor="price-10000-30000">1만원 ~ 3만원</label>
          </li>
          <li>
            <input
              type="radio"
              id="price-30000-50000"
              name="price"
              value="30000-49999"
              className="mr-2"
              onChange={handlePriceChange}
            />
            <label htmlFor="price-30000-50000">3만원 ~ 5만원</label>
          </li>
          <li>
            <input
              type="radio"
              id="price-50000"
              name="price"
              value="50000-999999"
              className="mr-2"
              onChange={handlePriceChange}
            />
            <label htmlFor="price-50000">5만원 이상</label>
          </li>
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PriceFilter;
