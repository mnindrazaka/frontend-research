import React from 'react';
import { css } from '@emotion/react';
import Link from 'next/link';
import { getProducts, ProductsApiResponse } from '@frontend-research/fetchers';

export type ProductListScreenProps = {
  productsResponse: ProductsApiResponse | null;
  page: number;
};

const LIMIT = 10;

export async function getProductListScreenInitialProps(
  page: number
): Promise<ProductListScreenProps> {
  const skip = LIMIT * (page - 1);
  const productsResponse: ProductsApiResponse = await getProducts({
    skip,
    limit: LIMIT,
  });
  return { page, productsResponse };
}

export function ProductListScreen(props: ProductListScreenProps) {
  const [productsResponse, setProductsResponse] =
    React.useState<ProductsApiResponse | null>(props.productsResponse);

  const totalPage = Math.ceil((productsResponse?.total ?? 0) / LIMIT);
  const skip = LIMIT * (props.page - 1);

  React.useEffect(() => {
    getProducts({ skip, limit: LIMIT }).then(setProductsResponse);
  }, [skip]);

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
          <Link key={index} href={`/products/${index + 1}`}>
            <a>{index + 1}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductListScreen;
