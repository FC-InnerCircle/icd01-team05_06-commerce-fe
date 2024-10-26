import { ApiResponse } from '@/types/api-types';
import { Category } from '@/types/category-types';
import { Product, ProductsOrderResponse } from '@/types/product-types';

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`/api/products/categories`);

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data: ApiResponse<Category[]> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error?.message || 'Error fetching categories');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories. Please try again later.');
  }
};

export const fetchProductById = async (productId: number): Promise<Product> => {
  try {
    const response = await fetch(`/api/products/${productId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }

    const data: ApiResponse<Product> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error?.message || 'Failed to fetch product details');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw new Error('Failed to fetch product details. Please try again later.');
  }
};

export const getProductForOrder = async (orderData: {
  products: { productId: number; quantity: number }[];
}): Promise<ProductsOrderResponse> => {
  try {
    const response = await fetch('/api/products/order/before', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products before order');
    }

    const data: ApiResponse<ProductsOrderResponse> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error?.message || 'Error fetching products for order');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching products for order:', error);
    throw new Error('Failed to fetch products for order. Please try again later.');
  }
};
