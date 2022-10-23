import { GetServerSideProps } from 'next';
import {
  ProductListScreen,
  ProductListScreenProps,
} from '@frontend-research/screens';

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

type Params = {
  page: string;
};

export const getServerSideProps: GetServerSideProps<
  ProductListScreenProps,
  Params
> = async (ctx) => {
  const pageParams = ctx.params?.page ?? '1';
  const page = parseInt(pageParams);

  const skip = LIMIT * (page - 1);
  const productsResponse: ProductsApiResponse = await fetch(
    `https://dummyjson.com/products?skip=${skip}&limit=${LIMIT}`
  ).then((res) => res.json());
  return { props: { productsResponse, page } };
};

export default ProductListScreen;
