import { GetStaticProps, GetStaticPaths } from 'next';
import {
  getProductListScreenInitialProps,
  ProductListScreen,
  ProductListScreenProps,
} from '@frontend-research/screens';

type Params = {
  page: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { productsResponse } = await getProductListScreenInitialProps(1);
  const totalPage = Math.ceil(productsResponse.total / productsResponse.limit);
  const paths = Array.from(Array(totalPage)).map((_, index) => ({
    params: { page: String(index + 1) },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<
  ProductListScreenProps,
  Params
> = async (ctx) => {
  const pageParams = ctx.params?.page ?? '1';
  const page = parseInt(pageParams);
  const props = await getProductListScreenInitialProps(page);
  return { props };
};

export default ProductListScreen;
