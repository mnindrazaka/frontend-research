import {
  ProductListScreen,
  ProductListScreenProps,
} from '@frontend-research/screens';
import { GetServerSideProps } from 'next';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type ProductsApiResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const LIMIT = 10;

export const getServerSideProps: GetServerSideProps<
  ProductListScreenProps
> = async (ctx) => {
  const page = 1;

  const skip = LIMIT * (page - 1);
  const productsResponse: ProductsApiResponse = await fetch(
    `https://dummyjson.com/products?skip=${skip}&limit=${LIMIT}`
  ).then((res) => res.json());
  return { props: { productsResponse, page } };
};

export default ProductListScreen;
