import { IBill } from "./bill.interface"
import { IProduct } from "./product.interface"
import { IShopowner } from "./shopowner.interface"

export interface Data {
  billList: IBill[]
  shopownerList: IShopowner[]
  productList: IProduct[]
}
