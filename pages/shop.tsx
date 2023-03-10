
import { ReactElement, useEffect, useState } from 'react';
import Layout from '../layouts';
import { homeApiManagement } from '../api-clients/home';
import { ProductOverviewType } from '@/models/product';
import CustomContainer from '../components/molecules/CustomContainer';
import BreadCrumb from '../components/molecules/BreadCrumb';
import { NextPageWithLayout } from './_app';
import ShopBody from '../components/templates/ShopBody';

const Home: NextPageWithLayout = () => {

  return (
    <CustomContainer size="medium">
      <BreadCrumb firstLayer="Trang chủ" lastLayer={"Shop"} />
      <ShopBody />
    </CustomContainer>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Home;
