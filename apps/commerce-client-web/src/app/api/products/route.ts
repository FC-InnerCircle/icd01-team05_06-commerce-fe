import { NextResponse } from 'next/server';
import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api-types';
import { ProductsResponse } from '@/types/product-types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const queryParams = searchParams.toString();

  try {
    const response = await api
      .get(`product/v1/products?${queryParams}`)
      .json<ApiResponse<ProductsResponse>>();

    if (!response.success || !response.data) {
      throw new Error(response.error?.message);
    }

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 },
    );
  }
}
