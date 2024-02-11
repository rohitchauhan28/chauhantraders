
export interface IBillProductList {
  productId: number
  quantity: number
  quantityType: string
  pricePerUnit?: number
  pricePerPack?: number
  pricePerBox?: number
}

export interface IBill {
  billNo: number
  isDeleted: Boolean
  shopOwnersId: number
  billDate: string
  totalItem: number
  totalPaymentAmount: number
  billProductList: IBillProductList[]
}