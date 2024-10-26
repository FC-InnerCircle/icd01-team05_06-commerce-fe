import { NextResponse } from 'next/server';
import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api-types';
import { ProductsOrderResponse } from '@/types/product-types';
import { getHeadersWithToken } from '@/app/actions/utils/action-helper';

export async function POST(request: Request) {
  const headers = await getHeadersWithToken();

  if (!headers) {
    return NextResponse.json({ success: false, message: 'No token found' }, { status: 401 });
  }

  try {
    const orderData = await request.json();

    const response = await api
      .post('product/v1/products/order/before', {
        body: JSON.stringify(orderData),
        headers,
      })
      .json<ApiResponse<ProductsOrderResponse>>();

    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to fetch products before order');
    }

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Failed to fetch products before order:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products before order' },
      { status: 500 },
    );
  }
}
