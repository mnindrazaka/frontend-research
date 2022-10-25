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
  const [loading, setLoading] = React.useState(props.productsResponse === null);
  const [error, setError] = React.useState<string | null>(null);

  const totalPage = Math.ceil((productsResponse?.total ?? 0) / LIMIT);
  const skip = LIMIT * (props.page - 1);

  React.useEffect(() => {
    if (productsResponse === null) {
      setLoading(true);
      getProducts({ skip, limit: LIMIT })
        .then(setProductsResponse)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [productsResponse, skip]);

  return (
    <div>
      <h1
        css={css`
          color: red;
        `}
      >
        Welcome
      </h1>
      {loading ? (
        <p>loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : productsResponse === null ||
        productsResponse.products.length === 0 ? (
        <p>empty data</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default ProductListScreen;
