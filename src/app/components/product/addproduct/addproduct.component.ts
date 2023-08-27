import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-addproduct",
  templateUrl: "./addproduct.component.html",
  styleUrls: ["./addproduct.component.scss"],
})
export class AddproductComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      productName: "",
      pricePerUnit: null,
      pricePerPack: null,
      pricePerBox: null,
      quantityPerPack: null,
      quantityPerBox: null,
    });
  }
}
