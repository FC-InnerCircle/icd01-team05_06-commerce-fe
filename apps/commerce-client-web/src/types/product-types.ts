export type Product = {
  id: number;
  title: string;
  author: string;
  price: number;
  discount: number;
  publisher: string;
  pubdate: string;
  isbn: string;
  coverImage: string;
  description: string;
  category: {
    id: number;
    name: string;
    parentCategory: {
      id: number;
      name: string;
    };
  };
  pages?: number;
  weight?: string;
  size?: string;
  reviews?: string[];
  tableOfContents?: string;
  isbn10?: string;
  publicationDate?: string;
};
