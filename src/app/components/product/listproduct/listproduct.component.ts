import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IProduct } from "src/app/interfaces/product.interface";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-listproduct",
  templateUrl: "./listproduct.component.html",
  styleUrls: ["./listproduct.component.scss"]
})
export class ListproductComponent implements OnInit {

  filterType = [
    {value: "productId", viewValue: "ProductId"},
    {value: "productName", viewValue: "Product Name"}
  ];

  productList!: IProduct[];
  filteredProductList!: IProduct[];

  filterForm!: FormGroup;

  isFilterApplied = false;

  constructor(
    private _productService: ProductService,
    private router: Router,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      filterSearchType: ["", Validators.required],
      filterText: ["", Validators.required]
    });
    this.productList = this._productService.getProductList();
    this.filteredProductList = this.productList;
  }

  triggerEditHandler(shopId: number) {
    this.router.navigate(["product", "add"], {queryParams: {id: shopId}});
  }

  filterList() {
    this.isFilterApplied = true;
    let filterType: string = this.filterForm.value.filterSearchType;
    let filterText: string = this.filterForm.value.filterText;
    this.filteredProductList = this.productList.filter((product: any) => product[filterType].toString().includes(filterText));
  }

  resetList() {
    this.resetFilterForm();
    this.filteredProductList = this.productList;
  }
  resetFilterForm() {
    Object.keys(this.filterForm.controls).forEach(key => {
      this.filterForm.get(key)?.reset();
      this.filterForm.get(key)?.markAsUntouched();
      this.filterForm.get(key)?.setErrors(null);
    });
  }
}
