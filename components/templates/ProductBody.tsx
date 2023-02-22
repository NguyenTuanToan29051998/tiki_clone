/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, MouseEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/components/templates/ProductBody.module.scss';
import useFormat from '../../hooks/useFormat';
import { CategoryType, ProductByCategoryType } from '@/models/category';
import axios from 'axios';
import { starIcon } from '../../public/icons';

type PropTypes = {
  data: object[];
};

const ProductBody: FC<PropTypes> = (props) => {
  const { data } = props;
  const { formatNumberWithDot } = useFormat();
  const router = useRouter();
  const { searchInput } = router.query;
  const searchText = ''.toString().concat('`', searchInput as string, '`');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(5);
  const [numberSelected, setNumberSelected] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [productList, setProductList] = useState<ProductByCategoryType[]>([]);
  const [productsListBySearch, setProductsListBySearch] = useState<ProductByCategoryType[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>('');

  let userInfo: { id: string; };
  if (typeof window !== 'undefined') {
    userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
  }

  const handleSearch = (linkProduct: string, categoryName: string) => {
    setSearchKeyword(categoryName);
    const cate = linkProduct.split("/");
    const cateId = cate[cate.length - 1].replace('c', '');
    axios.get(`https://tiki.vn/api/personalish/v1/blocks/listings?category=${cateId}&limit=100&sort=top_seller`)
      .then(res => {
        setNumberSelected(0);
        setProductList(res.data.data);
      });
  };

  const handleSelectedTab = (numberTab: number) => {
    switch (numberTab) {
      case 0:
        setProductsListBySearch(productList);
        break;
      case 1: {
        let result: ProductByCategoryType[] = [];
        productList.map(item => {
          if (item?.badges_new?.filter(val => val.code === ('official_store')).length !== 0) {
            result.push(item);
          }
        });
        setProductsListBySearch(result);
      }
      break;
      case 2: {
        let result: ProductByCategoryType[] = [];
        productList.map(item => {
          if (item?.badges_new?.filter(val => val.code === ('freegift_items')).length !== 0 || item.bundle_deal) {
            result.push(item);
          }
        });
        setProductsListBySearch(result);
      }
      break;
      case 3: {
        setIsShowDropdown(true);
        // setProductsListBySearch(productList.sort((a, b) => b.discount_rate - a.discount_rate));
      }
      break;
      default:
        setIsShowDropdown(true);
        // setProductsListBySearch(productList.sort((a, b) => b.discount - a.discount));
        break;
    }
    setNumberSelected(numberTab);
  };

  const handleSelectedSortDiscountRate = (event: any, isLowToHigh: boolean) => {
    if (event) event.stopPropagation();
    setProductsListBySearch([...productList.sort((a, b) => (!isLowToHigh ? (a.discount_rate - b.discount_rate) : (b.discount_rate - a.discount_rate)))]);
    setIsShowDropdown(false);
  };

  const handleSelectedSortDiscount = (event: any, isLowToHigh: boolean) => {
    if (event) event.stopPropagation();
    setProductsListBySearch([...productList.sort((a, b) => (!isLowToHigh ? (a.discount - b.discount) : (b.discount - a.discount)))]);
    setIsShowDropdown(false);
  };

  useEffect(() => {
      axios.get(`https://publisher-api.masoffer.net/offer/pushsale?pub_id=godshades&token=bGVzYXV0aGplbnRodUBnbWFpbC5jb20%3D&date=08-03-2023%2000%3A00%3A00`, {
        // headers: {
        //   'Cookie': 'hng=VN|vi|VND|704; hng.sig=zdydsNS1SsmgPDnK6hvJok_XUpANfcD7ya93aWHPt94'
        // }
      }).then(res => {
        console.log(res.data, 'cc');
        setNumberSelected(0);
        setProductList(res.data.data);
      });
  }, []);

  return (
    <div className={styles.productBody}>
      <div className={styles.content}>
        <div className={styles.leftArea}>
          <div className={styles.blockFilter}>
            <h4 className={styles.title}>Danh Mục Sản Phẩm</h4>
            <div className={styles.listCollapsed}>
              <div className="position-relative">
              <div>
                {
                  data.map((item, index) => {
                    return (
                      <div key={index} onClick={() => setCategoryName(Object.keys(item).toString())} role="presentation">{Object.keys(item)}</div>
                    );
                  })
                }
              </div>
              <div style={{position: 'absolute',top: 0, left: '190px', width: '270px', backgroundColor: 'gray', zIndex: '10'}}>
                {
                  data.filter(val => Object.keys(val).toString() === categoryName).map((item, index) => {
                    return (
                      <div key={index}>{Object.values(item)[0].map((val: string, ind: number) => (
                        <div key={ind}>{val}</div>
                      ))}</div>
                    );
                  })
                }
              </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightArea}>
          <div className={styles.summarySearch}>
            <div className={styles.inputSearch}>{searchKeyword ? `Kết quả tìm kiếm cho ${''.toString().concat('`', searchKeyword as string, '`')}` : "Tất cả sản phẩm"}</div>
            <div className={styles.sorter}>
              <div>
                <div
                  className={`${styles.sorterItem} ${numberSelected === 0 ? `${styles.isSelected}` : ""}`}
                  onClick={() => handleSelectedTab(0)}
                  role="presentation"
                >
                  Tất cả
                </div>
                {numberSelected === 0 && <div className={styles.underlined} />}
              </div>
              <div>
                <div
                  className={`${styles.sorterItem} ${numberSelected === 1 ? `${styles.isSelected}` : ""}`}
                  onClick={() => handleSelectedTab(1)}
                  role="presentation"
                >
                  Official
                </div>
                {numberSelected === 1 && <div className={styles.underlined} />}
              </div>
              <div>
                <div
                  className={`${styles.sorterItem} ${numberSelected === 2 ? `${styles.isSelected}` : ""}`}
                  onClick={() => handleSelectedTab(2)}
                  role="presentation"
                >
                  Có khuyến mãi
                </div>
                {numberSelected === 2 && <div className={styles.underlined} />}
              </div>
              <div>
                <div
                  className={`${styles.sorterItem} ${numberSelected === 3 ? `${styles.isSelected}` : ""}`}
                  onClick={() => handleSelectedTab(3)}
                  role="presentation"
                >
                  Phần trăm giảm giá
                  {numberSelected === 3 && isShowDropdown && (
                    <div className={styles.searchAutocomplete}>
                      <div className={styles.itemSearch} onClick={(e) => handleSelectedSortDiscountRate(e, false)} role="presentation">Giảm giá từ thấp đến cao</div>
                      <div className={styles.itemSearch} onClick={(e) => handleSelectedSortDiscountRate(e, true)} role="presentation">Giảm giá từ cao xuống thấp</div>
                    </div>
                  )}
                </div>
                {numberSelected === 3 && <div className={styles.underlined} />}
              </div>
              <div>
                <div
                  className={`${styles.sorterItem} ${numberSelected === 4 ? `${styles.isSelected}` : ""}`}
                  onClick={() => handleSelectedTab(4)}
                  role="presentation"
                >
                  Số tiền khuyến mãi
                  {numberSelected === 4 && isShowDropdown && (
                    <div className={styles.searchAutocomplete}>
                      <div className={styles.itemSearch} onClick={(e) => handleSelectedSortDiscount(e, false)} role="presentation">Số tiền giảm từ thấp đến cao</div>
                      <div className={styles.itemSearch} onClick={(e) => handleSelectedSortDiscount(e, true)} role="presentation">Số tiền giảm từ cao xuống thấp</div>
                    </div>
                  )}
                </div>
                {numberSelected === 4 && <div className={styles.underlined} />}
              </div>
            </div>
          </div>
          {(numberSelected === 0 ? !productList.length : !productsListBySearch.length) ? (
            <div className="m-4">Chưa có sản phẩm phù hợp</div>
          ) : (
            <div className={styles.productList}>
              {((numberSelected === 0 ? productList : productsListBySearch) || []).map((item, index) => (
                <div className={styles.productItem} onClick={() => window.open(`https://rutgon.me/v0/6cCVQOqXuLRPfEq0tRR9nw?url=https%3A%2F%2Ftiki.vn/${item.url_path}`)} role="presentation" key={index}>
                  <div className="position-relative">
                    {item?.badges_new?.some(item => item.code === 'official_store') && (
                      <div className={styles.official} style={{ backgroundImage: `url("/assets/brand-2.jpg")` }} />
                    )}
                    <div className={styles.thumbnail} style={{ backgroundImage: `url("${item.thumbnail_url}")` }} />
                    {/* <div className={styles.addToFavorites} onClick={(e) => handleAddToFavorite(e, item.product.id)} role="presentation">{item.like ? favoriteRedIcon : favoriteGrayIcon}</div> */}
                  </div>
                  <div className={styles.info}>
                    <div className={styles.name}>
                      <h3>{item.name}</h3>
                    </div>
                    {!!item.quantity_sold?.value ? (
                      <div className="d-flex gap-2">
                        <div className={styles.fullRating}>
                          <span className={styles.point}>{item.rating_average}</span>
                          <div className="d-flex">{starIcon('14', '#fdd836')}</div>
                        </div>
                        <div className={styles.bisectingLine} />
                        <span className={styles.quantity}>Đã bán {item.quantity_sold.value}</span>
                      </div>
                    ) : (
                      <div className={styles.emptyRating} />
                    )}
                    <div className={`${styles.priceDiscount} ${styles.hasDiscount}`}>
                      <div className="price-discount__price">{formatNumberWithDot(item.price)} đ</div>
                      {!!item.discount_rate && (
                        <div className="price-discount__discount">-{item.discount_rate}%</div>
                      )}
                    </div>
                    {/* <div className={styles.badgeUnderPrice}>Tặng tới 1000 ASA (224k ₫) <br />≈ 1.0% hoàn tiền</div> */}
                    <div className={styles.badgeUnderRating}>
                      <div className={styles.item}>
                        <span>Freeship+</span>
                      </div>
                      {/* <div className={styles.item}>
                    <span>Trả góp</span>
                  </div> */}
                    </div>
                  </div>
                  {/* <div className={styles.badgeDelivery}>
                <span>Giao thứ 3, ngày 03/01</span>
              </div> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductBody;
