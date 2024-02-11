import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { ProductService } from "src/app/services/product.service";
import { ShopownerService } from "src/app/services/shopowner.service";

@Component({
  selector: "app-addproduct",
  templateUrl: "./addproduct.component.html",
  styleUrls: ["./addproduct.component.scss"],
})
export class AddproductComponent {
  productForm: FormGroup;

  isDisabled = false;

  productId = "";

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      productName: ["", Validators.required],
      pricePerUnit: [null, Validators.required],
      pricePerPack: [null, Validators.required],
      pricePerBox: [null, Validators.required],
      quantityPerPack: [null, Validators.required],
      quantityPerBox: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.queryParams["id"] ?? "";
    if (!this.productId) return;
    let product = this.productService.getProductListByproductId(+this.productId)[0];
    this.productForm.setValue({
      productName :product.productName,
      pricePerUnit :product.pricePerUnit,
      pricePerPack :product.pricePerPack,
      pricePerBox :product.pricePerBox,
      quantityPerPack :product.quantityPerPack,
      quantityPerBox :product.quantityPerBox,
    })
  }

  triggerAddProductHandler() {
    debugger;
    this.isDisabled = true;
    let productDetail = {
      ...this.productForm.value,
    };
    if (this.productId) {
      productDetail.productId = +this.productId;
      this.productService.updateProduct(productDetail);

    }else {
      productDetail.productId = this.productService.getProductList().length + 1;
      this.productService.addProduct(productDetail);
    }
    this.dataService.uploadData().subscribe(() => {
      this.isDisabled = false;
      this.resetFormControls();
      history.back();
    });
  }

  resetFormControls() {
    this.productForm.reset();
    Object.keys(this.productForm.controls).forEach(key => {
      this.productForm.get(key)?.reset();
      // this.productForm.get(key)?.setErrors(null);
    });
  }
}
