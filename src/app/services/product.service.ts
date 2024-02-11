import { Injectable } from "@angular/core";
import { IProduct } from "../interfaces/product.interface";

@Injectable({
  providedIn: "root"
})
export class ProductService {

  productList!: IProduct[];

  constructor() { }

  getProductList() {
    return this.productList;
  }
  setProductList(productList: IProduct[]) {
    this.productList = productList;
  }
  addProduct(product: IProduct) {
    this.productList.push(product);
  }

  getProductListByproductId(productId: number) {
    return this.productList.filter((shopowner:IProduct) => shopowner.productId === productId);
  }

  updateProduct(updateproductList: IProduct) {
    this.productList.forEach((product: IProduct, index) => {
      if(+updateproductList.productId == +product.productId ) this.productList[index] = updateproductList;
    })
  }
}
