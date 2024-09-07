import React from 'react';
import ProductCard from '@/app/(default)/search/components/(searchResult)/productCard';
import { SearchResultProps } from '@/types/productTypes'; // 인터페이스를 가져오기
import { parseAndRoundPrice } from '@/lib/utils'; // 유틸리티 함수 가져오기

function SearchResult({ products, onAddToCart, onBuyNow }: SearchResultProps) {
  return (
    <div className="space-y-4">
      {products.map((product) => {
        const roundedPrice = parseAndRoundPrice(product.price); // 유틸리티 함수 사용

        return (
          <ProductCard
            key={product.id}
            id={product.id}
            imageUrl={product.coverImage}
            title={product.title}
            price={roundedPrice} // 반올림된 가격을 전달
            discount={product.discount} // 할인 가격
            tags={product.tags}
            onAddToCart={() => onAddToCart(product.id)}
            onBuyNow={() => onBuyNow(product.id)}
          />
        );
      })}
    </div>
  );
}

export default SearchResult;
