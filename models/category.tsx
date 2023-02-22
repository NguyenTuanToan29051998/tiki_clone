export type CategoryType = {
  text: string,
  icon_url: string,
  link: string,
}

export type ProductByCategoryType = {
  id: number,
  name: string,
  price: number,
  discount: number,
  discount_rate: number,
  thumbnail_url: string,
  rating_average: number,
  url_path: string,
  bundle_deal: boolean,
  quantity_sold: {
    text: string,
    value: number,
  }
  badges_new: {
    code: string,
    text: string,
  }[]
}

export type ProductByWebsiteType = {
  id: number,
  name: string,
  avatar: string,
  domain: string,
}

export type ProductByShopType = {
  id: number,
  link: string,
  info: {
    avatar: string,
    content: string,
  }
  pushsale_offer_name: string,
}