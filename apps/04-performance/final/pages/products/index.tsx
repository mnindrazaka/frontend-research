import {
  getProductListScreenInitialProps,
  ProductListScreen,
  ProductListScreenProps,
} from '@frontend-research/screens';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<
  ProductListScreenProps
> = async (ctx) => {
  ctx.res.setHeader('Cache-Control', 'public, max-age=60');
  const page = 1;
  const props = await getProductListScreenInitialProps(page);
  return { props };
};

export default ProductListScreen;
