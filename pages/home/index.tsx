import type { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import HomeBody from '../../components/templates/HomeBody';
import Layout from '../../layouts';
import { homeApiManagement } from '../../api-clients/home';
import { ProductOverviewType } from '@/models/product';
import CustomContainer from '../../components/molecules/CustomContainer';
import BreadCrumb from '../../components/molecules/BreadCrumb';

const Home: NextPageWithLayout = () => {

  const [productList, setProductList] = useState<ProductOverviewType[]>([]);
  const [topBuyList, setTopBuyList] = useState<ProductOverviewType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);

  const arr = [
    {title: 'toan1', month: '1'},
    {title: 'toan2', month: '2'},
    {title: 'toan3', month: '3'},
    {title: 'toan4', month: '1'},
    {title: 'toan5', month: '2'},
    {title: 'toan6', month: '8'},
  ];

  const result = {
    '1': [
      { title: 'toan1', month: '1' },
      { title: 'toan4', month: '1' },
    ],
    '2': [
      { title: 'toan2', month: '2' },
      { title: 'toan5', month: '2' },
    ],
    '3': [
      { title: 'toan3', month: '3' },
    ],
    '8': [
      {title: 'toan6', month: '8'},
    ]
  };

  return (
    <CustomContainer size="medium">
      <BreadCrumb firstLayer="Trang chủ" lastLayer={"Sản phẩm"} />
      <HomeBody
        productList={productList}
        setProductList={setProductList}
        topBuyList={topBuyList}
        setTopBuyList={setTopBuyList}
        pageCount={pageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
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
