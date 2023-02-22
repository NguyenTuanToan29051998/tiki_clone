
import { ReactElement, useEffect, useState } from 'react';
import Layout from '../layouts';
import { homeApiManagement } from '../api-clients/home';
import { ProductOverviewType } from '@/models/product';
import { CartApiManagement } from '../api-clients/cart';
import CustomContainer from '../components/molecules/CustomContainer';
import BreadCrumb from '../components/molecules/BreadCrumb';
import { NextPageWithLayout } from './_app';
import WebsiteBody from '../components/templates/WebsiteBody';

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

  useEffect(() => {
    let userInfo: { id: string; };
    if (typeof window !== 'undefined') {
      userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
    } else return;
    homeApiManagement.getAllProduct(userInfo.id && userInfo.id || '').then((res) => {
      setProductList(res.data.allProducts.content);
      setTopBuyList(res.data.topBuy);
      setPageCount(res.data.allProducts.totalElements);
    }).catch(err => console.log(err));
  }, [currentPage]);

  useEffect(() => {
    let userInfo: { id: string; };
    if (typeof window !== 'undefined') {
      userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
    } else return;
    CartApiManagement.getCartDetail(userInfo.id).then((res) => {
      localStorage.setItem('total-cart', res.data.cartDetail.cartItems.length || '');
    }).catch(err => console.log(err));
  }, []);

  return (
    <CustomContainer size="medium">
      <BreadCrumb firstLayer="Trang chủ" lastLayer={"Website"} />
      <WebsiteBody />
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
