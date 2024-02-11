import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CartService {

  cartItemDetails: any;

  isCartDataAvaliable = false;
  constructor(private http: HttpClient) { }

  setCartItemDetails(itemDetails: any) {
    this.cartItemDetails = itemDetails;
  }
  
  getCartItemDetails() {
    return this.cartItemDetails;
  }

  upload() {
    // this.http.post(
    //   "https://www.googleapis.com/upload/drive/v3/files?uploadType=media",

    // );
  }
}
