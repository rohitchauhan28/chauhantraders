import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Data } from "../interfaces/main.interface";
import { IBill } from "../interfaces/bill.interface";
import { IProduct } from "../interfaces/product.interface";
import { IShopowner } from "../interfaces/shopowner.interface";
import { BillsService } from "./bills.service";
import { ProductService } from "./product.service";
import { ShopownerService } from "./shopowner.service";
import { take, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class DataService {

  fileId = environment.deriveFileId;
  data!: any;

  constructor(
    private httpClient: HttpClient,
    private billservice: BillsService,
    private productService: ProductService,
    private shopownerService: ShopownerService,
    private authService: AuthService,
  ) { }

  uploadData() {
    const folderId = "1pC_FHfqIdYLsrTObdpXA5GZf7izoReWW"; // Please set your folder ID.
    const fileName = "data.json"; // Please set filename on Google Drive.

    let data: Data = {
      billList: this.billservice.getBillList() ?? [],
      shopownerList: this.shopownerService.getShopownerList() ?? [],
      productList: this.productService.getProductList() ?? []
    }
  //   const jsonContent = {

  // };
  //   const jsonBlob = new Blob([JSON.stringify(jsonContent)], { type: "application/json" });
    
  //   const form = new FormData();
  //   form.append("metadata", new Blob([JSON.stringify({ name: fileName, parents: [folderId] })], { type: "application/json" }));
  //   form.append("file", jsonBlob, fileName);
    
    return this.httpClient.patch(`/upload/drive/v3/files/${this.fileId}?uploadType=multipart`,data, {
      headers: { "Authorization": `Bearer ${this.authService.accessToken}` },
    });
  }

  uploadDataReset() {
    const folderId = "1pC_FHfqIdYLsrTObdpXA5GZf7izoReWW"; // Please set your folder ID.
    const fileName = "data.json"; // Please set filename on Google Drive.

    let data: Data = {
      billList: [],
      shopownerList: [],
      productList: []
    }
  //   const jsonContent = {

  // };
  //   const jsonBlob = new Blob([JSON.stringify(jsonContent)], { type: "application/json" });
    
  //   const form = new FormData();
  //   form.append("metadata", new Blob([JSON.stringify({ name: fileName, parents: [folderId] })], { type: "application/json" }));
  //   form.append("file", jsonBlob, fileName);
    
    return this.httpClient.patch(`/upload/drive/v3/files/${this.fileId}?uploadType=multipart`,data, {
      headers: { "Authorization": `Bearer ${this.authService.accessToken}` },
    });
  }

  downloadData() {
    return this.httpClient.get<Data>(`https://www.googleapis.com/drive/v3/files/${this.fileId}?alt=media`, {
      headers: {
        "Authorization": `Bearer ${this.authService.accessToken}`
      }
    }).pipe(take(1), tap((data: Data) => {
      let { billList, shopownerList, productList } = data;
      this.billservice.setBillList(billList ?? []);
      this.shopownerService.setShopownerList(shopownerList ?? []);
      this.productService.setProductList(productList ?? []);
    }));
  }
  async downloadData2() {
    const header = new Headers();
    header.append("Authorization", `Bearer ${this.authService.accessToken}`);
    return new Promise(async (resolve: Function, reject: Function) => {
      let res = await fetch(`https://www.googleapis.com/drive/v3/files/${this.fileId}?alt=media`, {
        headers: header
      })
      this.data = await res.json() as any;
      if(this.data?.error?.code) {reject({code: this.data?.error?.code}); return;};
      let { billList, shopownerList, productList } = this.data;
      this.billservice.setBillList(billList ?? []);
      this.shopownerService.setShopownerList(shopownerList ?? []);
      this.productService.setProductList(productList ?? []);
      resolve();
    })
  
  }
}