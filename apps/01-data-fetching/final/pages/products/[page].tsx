import React from 'react';
import { css } from '@emotion/react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

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

type Props = {
  productsResponse: ProductsApiResponse | null;
  page: number;
};

const LIMIT = 10;

type Params = {
  page: string;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  ctx
) => {
  const pageParams = ctx.params?.page ?? '1';
  const page = parseInt(pageParams);

  const skip = LIMIT * (page - 1);
  const productsResponse: ProductsApiResponse = await fetch(
    `https://dummyjson.com/products?skip=${skip}&limit=${LIMIT}`
  ).then((res) => res.json());
  return { props: { productsResponse, page } };
};

export function Index(props: Props) {
  const [productsResponse, setProductsResponse] =
    React.useState<ProductsApiResponse | null>(props.productsResponse);

  const totalPage = Math.ceil((productsResponse?.total ?? 0) / LIMIT);
  const skip = LIMIT * (props.page - 1);

  React.useEffect(() => {
    fetch(`https://dummyjson.com/products?skip=${skip}&limit=${LIMIT}`)
      .then((res) => res.json())
      .then(setProductsResponse);
  }, [props.productsResponse, skip]);

  return (
    <div>
      <h1
        css={css`
          color: red;
        `}
      >
        Welcome
      </h1>
      <ol start={skip + 1}>
        {productsResponse?.products.map(({ id, title }) => (
          <li
            key={id}
            css={css`
              font-weight: bold;
            `}
          >
            {title}
          </li>
        ))}
      </ol>
      <div>
        {Array.from(Array(totalPage)).map((_, index) => (
          <Link key={index} href={`/products/${index + 1}`} passHref>
            <a>{index + 1}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Index;
