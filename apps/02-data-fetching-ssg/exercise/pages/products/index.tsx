import {
  getProductListScreenInitialProps,
  ProductListScreen,
  ProductListScreenProps,
} from '@frontend-research/screens';
import { GetServerSideProps } from 'next';

// TODO: Change this to getStaticProps
export const getServerSideProps: GetServerSideProps<
  ProductListScreenProps
> = async (_ctx) => {
  const page = 1;
  const props = await getProductListScreenInitialProps(page);
  return { props };
};

export default ProductListScreen;
