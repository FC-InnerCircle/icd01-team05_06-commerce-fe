import { NextResponse } from 'next/server';
import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api-types';
import { HomePageData } from '@/types/product-types';

export async function GET() {
  try {
    const response = await api.get('product/v1/home/products').json<ApiResponse<HomePageData>>();

    if (!response.success || !response.data) {
      throw new Error('Invalid response format');
    }

    return NextResponse.json({
      success: true,
      data: {
        hotNew: response.data.hotNew,
        recommend: response.data.recommend,
        bestseller: response.data.bestseller,
      },
    });
  } catch (error) {
    console.error('Failed to fetch home page books:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch home page books' },
      { status: 500 },
    );
  }
}
