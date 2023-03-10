import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/components/templates/WebsiteBody.module.scss';
import { starIcon } from '../../public/icons';
import PaginationSection from '../organisms/PaginationSection';
import useFormat from '../../hooks/useFormat';
import { CategoryType, ProductByCategoryType, ProductByWebsiteType } from '@/models/category';
import axios from 'axios';

type PropTypes = {
  // productList: ProductOverviewType[],
  // setProductList: Dispatch<SetStateAction<ProductOverviewType[]>>,
  // topBuyList: ProductOverviewType[],
  // setTopBuyList: Dispatch<SetStateAction<ProductOverviewType[]>>,
  // pageCount: number,
  // currentPage: number,
  // setCurrentPage: Dispatch<SetStateAction<number>>
};

const WebsiteBody: FC<PropTypes> = (props) => {
  const { formatNumberWithDot } = useFormat();
  const router = useRouter();
  const { searchInput } = router.query;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(5);
  const [numberSelected, setNumberSelected] = useState<number>(0);
  const [productList, setProductList] = useState<ProductByWebsiteType[]>([]);

  let userInfo: { id: string; };
  if (typeof window !== 'undefined') {
    userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
  }

  useEffect(() => {
    axios.get(`https://publisher-api.masoffer.net/offer/all?pub_id=godshades&token=bGVzYXV0aGplbnRodUBnbWFpbC5jb20%3D&date=03-08-2023%2000%3A00%3A00`)
      .then(res => {
        setProductList(res.data.data);
      });
  }, []);

  return (
    <div className={styles.websiteBody}>
      <div className={styles.content}>
        {/* <div className={styles.leftArea}>
          <div className={styles.blockFilter}>
            <h4 className={styles.title}>Danh Mục Sản Phẩm</h4>
            <div className={styles.listCollapsed}>
              {(categoryList || []).filter(x => x.text !== 'NGON').map((item, index) => (
                <span
                  key={index}
                  className={`${styles.searchFilterItem} ${item.text === searchKeyword && styles.isSelectedCategory}`}
                  onClick={() => handleSearch(item.link, item.text)}
                  role="presentation"
                >{item.text}</span>
              ))}
            </div>
          </div>
          <div className={styles.blockFilter}>
            <h4 className={styles.title}>Địa chỉ nhận hàng</h4>
            <div className={styles.listCollapsed}>
              <span className={styles.searchFilterItem}>Tẩy trang</span>
              <span className={styles.searchFilterItem}>Đầm Dáng Xòe</span>
              <span className={styles.searchFilterItem}>Sofa/ salon và phụ kiện</span>
            </div>
          </div>
          <div className={styles.blockFilter}>
            <h4 className={styles.title}>Đánh giá</h4>
            <div className={styles.listCollapsed}>
              <div className={styles.searchFilterItem}>
                <div className="d-flex gap-1">
                  <div className="d-flex">
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#fdd836')}
                  </div>
                  <span>Từ 5 sao</span>
                </div>
              </div>
              <div className={styles.searchFilterItem}>
                <div className="d-flex gap-1">
                  <div className="d-flex">
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#c7c7c7')}
                  </div>
                  <span>Từ 4 sao</span>
                </div>
              </div>
              <div className={styles.searchFilterItem}>
                <div className="d-flex gap-1">
                  <div className="d-flex">
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#fdd836')}
                    {starIcon('14', '#c7c7c7')}
                    {starIcon('14', '#c7c7c7')}
                  </div>
                  <span>Từ 3 sao</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.blockFilter}>
            <h4 className={styles.title}>Giá</h4>
            <div className={styles.listCollapsed}>
              <div className={styles.filterPrice}>Dưới 70.000</div>
              <div className={styles.filterPrice}>170.000 {`->`} 240.000</div>
              <div className={styles.filterPrice}>Trên 240.000</div>
              <div className={styles.priceSmallText}>Chọn khoảng giá</div>
              <div className={styles.inputGroup}>
                <input pattern="[0-9]*" placeholder="Giá từ" value="0" />
                <span>-</span>
                <input pattern="[0-9]*" placeholder="Giá đến" value="0" />
              </div>
              <button className={styles.submitButton}>Áp dụng</button>
            </div>
          </div>
          <div className={styles.blockFilter}>
            <h4 className={styles.title}>Thương hiệu</h4>
            <div className={styles.listCollapsed}>
              <div className={styles.searchFilterItem}>
                <div className="d-flex gap-2">
                  <input type="checkbox" name="" id="" className={styles.checkbox} />
                  <span>Senka</span>
                </div>
              </div>
              <div className={styles.searchFilterItem}>
                <div className="d-flex gap-2">
                  <input type="checkbox" name="" id="" className={styles.checkbox} />
                  <span>DHC</span>
                </div>
              </div>
              <div className={styles.searchFilterItem}>
                <div className="d-flex gap-2">
                  <input type="checkbox" name="" id="" className={styles.checkbox} />
                  <span>DHC</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className={styles.rightArea}>
          {/* <div className={styles.summarySearch}>
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
          </div> */}
          {!productList.length ? (
            <div className="m-4">Chưa có sản phẩm phù hợp</div>
          ) : (
            <div className={styles.productList}>
              {(productList || []).filter(val => val.domain && val.avatar).map((item, index) => (
                <div className={styles.productItem} onClick={() => window.open(`https://rutgon.me/v0/6cCVQOqXuLRPfEq0tRR9nw?url=${!item.domain.includes("https://") ? "https://" : ""}${item.domain}`)} role="presentation" key={index}>
                  <div className="position-relative">
                    {/* {item.badges_new.some(item => item.code === 'official_store') && (
                      <div className={styles.official} style={{ backgroundImage: `url("/assets/brand-2.jpg")` }} />
                    )} */}
                    <div className={styles.thumbnail} style={{ backgroundImage: `url("${item.avatar}")` }} />
                    {/* <div className={styles.addToFavorites} onClick={(e) => handleAddToFavorite(e, item.product.id)} role="presentation">{item.like ? favoriteRedIcon : favoriteGrayIcon}</div> */}
                  </div>
                  <div className={styles.info}>
                    <div className={styles.name}>
                      <h3>{item.name}</h3>
                    </div>
                    {/* {!!item.quantity_sold?.value ? (
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
                    </div> */}
                    {/* <div className={styles.badgeUnderPrice}>Tặng tới 1000 ASA (224k ₫) <br />≈ 1.0% hoàn tiền</div> */}
                    {/* <div className={styles.badgeUnderRating}>
                      <div className={styles.item}>
                        <span>Freeship+</span>
                      </div>
                      <div className={styles.item}>
                    <span>Trả góp</span>
                  </div>
                    </div> */}
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

export default WebsiteBody;
