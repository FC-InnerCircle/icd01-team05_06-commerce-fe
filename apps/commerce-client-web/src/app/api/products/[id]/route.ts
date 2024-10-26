import { NextResponse } from 'next/server';
import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api-types';
import { Product } from '@/types/product-types';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const productId = params.id;

  try {
    const response = await api.get(`product/v1/products/${productId}`).json<ApiResponse<Product>>();

    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to fetch product details');
    }

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Failed to fetch product details:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch product details' },
      { status: 500 },
    );
  }
}
