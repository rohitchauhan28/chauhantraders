import { Injectable } from "@angular/core";
import { IShopowner } from "../interfaces/shopowner.interface";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ShopownerService {

  private shopownerList!: IShopowner[];

  constructor() { }

  getShopownerList() {
    return this.shopownerList;
  }

  getShopownerListByShopId(shopId: number) {
    return this.shopownerList.filter((shopowner:IShopowner) => shopowner.shopId === shopId);
  }
  setShopownerList(shopownerList: IShopowner[]) {
    this.shopownerList = shopownerList;

  }
  addShopowner(shopowner: IShopowner) {
    this.shopownerList.push(shopowner);
  }

  updateShopowner(updateShopownerDetails: IShopowner) {
    this.shopownerList.forEach((shopowner: IShopowner, index) => {
      if(+updateShopownerDetails.shopId == +shopowner.shopId ) this.shopownerList[index] = updateShopownerDetails;
    })
  }

  removeShopowner() {}
}
