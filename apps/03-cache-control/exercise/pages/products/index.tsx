import {
  getProductListScreenInitialProps,
  ProductListScreen,
  ProductListScreenProps,
} from '@frontend-research/screens';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<
  ProductListScreenProps
> = async (_ctx) => {
  // TODO: Implement cache control

  const page = 1;
  const props = await getProductListScreenInitialProps(page);
  return { props };
};

export default ProductListScreen;
