export interface ProductsSearchParams {
  page?: string;
  size?: string;
  category?: string;
  word?: string;
  minPrice?: string;
  maxPrice?: string;
  type?: string;
}

export const extractSearchParams = (params: ProductsSearchParams) => {
  const searchParams: Record<string, string> = {
    page: params.page ?? '1',
    size: params.size ?? '5',
  };

  if (params.category) {
    searchParams.productCategoryId = params.category;
  }

  if (params.word) {
    searchParams.searchWord = params.word;
  }

  if (params.minPrice) {
    searchParams.minPrice = params.minPrice;
  }

  if (params.maxPrice) {
    searchParams.maxPrice = params.maxPrice;
  }

  if (params.type) {
    searchParams.homeProductType = params.type;
  }

  return new URLSearchParams(searchParams).toString();
};
