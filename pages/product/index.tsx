import type { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import Layout from '../../layouts';
import axios from 'axios';
import CustomLoading from '../../components/molecules/CustomLoading';
import ProductBody from '../../components/templates/ProductBody';
import CustomContainer from '../../components/molecules/CustomContainer';
import BreadCrumb from '../../components/molecules/BreadCrumb';
import { useRouter } from 'next/router';
import { ProductOverviewType } from '@/models/product';

const Product: NextPageWithLayout = () => {
  const router = useRouter();
  const { searchInput } = router.query;

  const mockData = [
    {
      'Thiết bị điện tử': [
        "dien-thoai-di-dong", "may-tinh-bang", "laptop", "may-tinh-de-ban-va-phu-kien", "am-thanh", "camera-giam-sat-2", "may-anh-may-quay-phim", "may-quay-phim", "man-hinh-vi-tinh", "man-hinh-may-in", "dong-ho-thong-minh", "dieu-khien-choi-game"
      ]
    },
    {
      'Phụ kiện điện tử': [
        "phu-kien-dien-thoai-may-tinh-bang", "thiet-bi-thong-minh", "thiet-bi-so", "phu-kien-may-anh-may-quay-phim", "phu-kien-may-bay-camera", "thiet-bi-luu-tru-2", "phu-kien-may-vi-tinh", "linh-kien-may-tinh", "phu-kien-ong-kinh", "thiet-bi-mang", "phu-kien-may-choi-game"
      ]
    },
    {
      'TV': [
        "tv-video-am-thanh-thiet-bi-deo-cong-nghe", "do-gia-dung-nho", "phu-kien-cho-tv"
      ]
    },
    {
      'Làm đẹp': [
        "cham-soc-da-mat", "trang-diem", "dung-cu-cham-soc-sac-dep", "san-pham-tam-cham-soc-co-the", "san-pham-cham-soc-toc", "cham-soc-ca-nhan", "cham-soc-cho-nam-gioi", "nuoc-hoa", "thuc-pham-bo-sung", "thuc-pham-cho-sac-dep", "ho-tro-tinh-duc", "thiet-bi-y-te"
      ]
    },
    {
      'Baby': [
        "ta-dung-cu-ve-sinh", "sua-cong-thuc-bot-an-dam", "quan-ao-phu-kien-cho-be", "do-dung-bu-sua-an-dam", "xe-ghe-em-be", "cham-soc-tre-so-sinh-tre-nho", "tam-cham-soc-co-the-tre-so-sinh", "do-choi-tro-choi", "xe-mo-hinh-tro-choi-dieu-khien-tu-xa", "the-thao-tro-choi-ngoai-troi", "do-choi-cho-tre-so-sinh-chap-chung", "do-choi-giao-duc-tre-em"
      ]
    }
  ];

  mockData.map(item => {
    console.log(Object.keys(item), 'xx');
  });

  return (
    <CustomContainer size="medium">
      <BreadCrumb firstLayer="Trang chủ" lastLayer={searchInput ? searchInput as string : "Sản phẩm"} />
      <ProductBody data={mockData} />
    </CustomContainer>
  );
};

Product.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Product;