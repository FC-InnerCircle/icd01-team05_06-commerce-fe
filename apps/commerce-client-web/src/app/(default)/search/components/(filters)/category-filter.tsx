'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Import useSearchParams for reading query parameters
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Category } from '@/types/category-types';
import { fetchCategories } from '@/services/product-api';

const CategoryFilter = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook to access current search params

  const currentCategoryId = searchParams.get('category'); // Get the current category ID from URL

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    getCategories();
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('category', categoryId.toString());

    router.push(`${window.location.pathname}?${currentParams.toString()}`);
  };

  return (
    <AccordionItem value="category">
      <AccordionTrigger>카테고리</AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              {/* Parent Category */}
              <div
                onClick={() => handleCategoryClick(category.id)}
                className={`mb-2 cursor-pointer rounded-md p-2 font-semibold hover:underline ${
                  currentCategoryId === category.id.toString()
                    ? 'bg-blue-100 text-lime-600'
                    : 'bg-slate-50 text-gray-800'
                }`}
              >
                {category.name}
              </div>

              {/* Check if there are child categories and render them */}
              {category.childCategories && category.childCategories.length > 0 && (
                <ul className="mt-2 space-y-1 border-gray-200 pl-4">
                  {category.childCategories.map((childCategory) => (
                    <li key={childCategory.id}>
                      <div
                        onClick={() => handleCategoryClick(childCategory.id)}
                        className={`cursor-pointer hover:underline ${
                          currentCategoryId === childCategory.id.toString()
                            ? 'font-semibold text-lime-600'
                            : 'text-gray-600'
                        }`}
                      >
                        • {childCategory.name}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CategoryFilter;
