// src/app/components/BookInfoPage.tsx

import React from 'react';

const BookInfoPage: React.FC<{ description: string }> = ({ description }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">도서정보</h2>
      <div>{description}</div>
    </div>
  );
};

export default BookInfoPage;
