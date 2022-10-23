import {
  getProductListScreenInitialProps,
  ProductListScreen,
  ProductListScreenProps,
} from '@frontend-research/screens';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps<ProductListScreenProps> = async (
  _ctx
) => {
  const page = 1;
  const props = await getProductListScreenInitialProps(page);
  return { props };
};

export default ProductListScreen;
