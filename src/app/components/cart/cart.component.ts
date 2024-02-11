import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {

  cartDetails: any;
  cartTotalAmount = 0;
  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartDetails = this.cartService.cartItemDetails;
    this.setCartTotalAmount();
  }

  setCartTotalAmount() {
    this.cartDetails.productList.forEach((item: any) => {
      switch (item.quantityType) {
        case "Unit":
          this.cartTotalAmount += item?.quantity * item.product.pricePerUnit;
          break;
        case "Pack":
          this.cartTotalAmount += item?.quantity * item.product.pricePerPack;
          break;
        case "Box":
          this.cartTotalAmount += item?.quantity * item.product.pricePerBox;
          break;
      }
    });
  }

  editCartBtnClicked() {
    this.router.navigateByUrl("/bill/create");
  }

  triggerPlaceOrderHandler(event: any) {
    
  }
}
