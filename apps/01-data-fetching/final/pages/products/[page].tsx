import { GetServerSideProps } from 'next';
import {
  getProductListScreenInitialProps,
  ProductListScreen,
  ProductListScreenProps,
} from '@frontend-research/screens';

type Params = {
  page: string;
};

export const getServerSideProps: GetServerSideProps<
  ProductListScreenProps,
  Params
> = async (ctx) => {
  const pageParams = ctx.params?.page ?? '1';
  const page = parseInt(pageParams);
  const props = await getProductListScreenInitialProps(page);
  return { props };
};

export default ProductListScreen;
