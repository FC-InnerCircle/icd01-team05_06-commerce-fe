import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  // 입력값이 변경되면 searchTerm 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // URL에 searchWord 파라미터 업데이트
  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (searchTerm.trim()) {
      // 검색어가 있을 때는 SearchWord 파라미터를 추가 또는 업데이트
      currentParams.set('SearchWord', searchTerm);
    } else {
      // 검색어가 없을 때는 SearchWord 파라미터를 제거
      currentParams.delete('SearchWord');
    }

    // 변경된 파라미터로 URL을 교체하여 페이지 이동 없이 URL 업데이트
    router.replace(`${window.location.pathname}?${currentParams.toString()}`);
  }, [searchTerm, router, searchParams]);

  // URL 파라미터가 변경될 때 searchWord가 없는 경우 input 초기화
  useEffect(() => {
    const searchWord = searchParams.get('SearchWord');
    if (searchWord) {
      setSearchTerm(searchWord); // URL에 있는 searchWord를 입력값으로 설정
    } else {
      setSearchTerm(''); // searchWord 파라미터가 없으면 input 초기화
    }
  }, [searchParams]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="relative mx-auto w-full max-w-md">
      <input
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Search..."
        type="search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="submit" className="absolute right-3 top-2.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-search size-4 text-gray-400"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
};

export default Search;
