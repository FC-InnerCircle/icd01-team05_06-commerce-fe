import { NextResponse } from 'next/server';
import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api-types';
import { Category } from '@/types/category-types';

export async function GET() {
  try {
    const response = await api.get('product/v1/categories').json<ApiResponse<Category>>();

    if (!response.success || !response.data) {
      throw new Error('Failed to fetch categories');
    }

    if (!response.data.childCategories) {
      return NextResponse.json({ success: true, data: [] });
    }

    return NextResponse.json({ success: true, data: response.data.childCategories });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch categories' },
      { status: 500 },
    );
  }
}
