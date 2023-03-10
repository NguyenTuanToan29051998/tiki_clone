import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/components/templates/WebsiteBody.module.scss';
import useFormat from '../../hooks/useFormat';
import { ProductByShopType } from '@/models/category';
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

const ShopBody: FC<PropTypes> = (props) => {
  const { formatNumberWithDot, formatShortDate } = useFormat();
  const router = useRouter();
  const [productList, setProductList] = useState<ProductByShopType[]>([]);

  let userInfo: { id: string; };
  if (typeof window !== 'undefined') {
    userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
  }

  useEffect(() => {
    axios.get(`https://publisher-api.masoffer.net/offer/pushsale?pub_id=godshades&token=bGVzYXV0aGplbnRodUBnbWFpbC5jb20%3D&date=${formatShortDate(new Date().toString())}%2000%3A00%3A00`)
      .then(res => {
        setProductList(res.data.data);
      });
  }, []);

  return (
    <div className={styles.websiteBody}>
      <div className={styles.content}>
        <div className={styles.rightArea}>
          {!productList.length ? (
            <div className="m-4">Chưa có sản phẩm phù hợp</div>
          ) : (
            <div className={styles.productList}>
              {(productList || []).map((item, index) => (
                <div className={styles.productItem} onClick={() => window.open(`https://rutgon.me/v0/6cCVQOqXuLRPfEq0tRR9nw?url=${item.link}`)} role="presentation" key={index}>
                  <div className="position-relative">
                    {/* {item.badges_new.some(item => item.code === 'official_store') && (
                      <div className={styles.official} style={{ backgroundImage: `url("/assets/brand-2.jpg")` }} />
                    )} */}
                    <div className={styles.thumbnail} style={{ backgroundImage: `url("${item.info.avatar}")` }} />
                    {/* <div className={styles.addToFavorites} onClick={(e) => handleAddToFavorite(e, item.product.id)} role="presentation">{item.like ? favoriteRedIcon : favoriteGrayIcon}</div> */}
                  </div>
                  <div className={styles.info}>
                    <div className={styles.name}>
                      <h3>{item.pushsale_offer_name}</h3>
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

export default ShopBody;
