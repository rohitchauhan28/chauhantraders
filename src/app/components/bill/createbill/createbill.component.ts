import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { CartService } from "src/app/services/cart.service";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-createbill",
  templateUrl: "./createbill.component.html",
  styleUrls: ["./createbill.component.scss"],
})
export class CreatebillComponent implements OnInit {
  billsFormGroup!: FormGroup;

  quantityTypes = ["Unit", "Pack", "Box"];

  @ViewChild("el") element!: ElementRef;

  productList = [
    {
      productId: 1,
      productName: "colgate 10",
      pricePerUnit: 9,
      pricePerPack: 100,
      pricePerBox: 2000,
      quantityPerPack: 12,
      quantityPerBox: 144,
    },
    {
      productId: 2,
      productName: "colgate 20",
      pricePerUnit: 9,
      pricePerPack: 100,
      pricePerBox: 2000,
      quantityPerPack: 12,
      quantityPerBox: 144,
    },
    {
      productId: 3,
      productName: "colgate 10 free",
      pricePerUnit: 9,
      pricePerPack: 100,
      pricePerBox: 2000,
      quantityPerPack: 12,
      quantityPerBox: 144,
    },
  ];

  filteredShopList!: any;

  shopNameList = [
    {
      shopId: 1,
      ownerName: "Sanjay Patil",
      contactNumber: "9823783443",
      address: "Nanded",
      shopName: "Mauli Kirana",
    },
    {
      shopId: 2,
      ownerName: "Santosh Patil",
      contactNumber: "9823783443",
      address: "Nanded",
      shopName: "Patil Kirana",
    },
    {
      shopId: 3,
      ownerName: "Vijay Patil",
      contactNumber: "9823783443",
      address: "Nanded",
      shopName: "Patil Jewellers",
    },
  ];
  // filteredShopNameOptions!: Observable<string[]>;

  indexOfChipSelectedForUpdate: number = 0;

  updateProductDetails: any;

  filteredProductNameList!: any;
  isUpdateFormViewVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService, 
    private router: Router, 
    private dataService: DataService, 
  ) { }
  
  ngOnInit() {
    this.billsFormGroup = this.formBuilder.group({
      shop: ["", Validators.required],
      productList: this.formBuilder.array([
        this.formBuilder.group({
          product: ["", Validators.required],
          quantityType: ["", Validators.required],
          quantity: ["", Validators.required],
        }),
      ]),
    });

    if (this.cartService.isCartDataAvaliable) {
      this.setInitialFormValues();
    }

    // this.dataService.downloadData().subscribe(() => {});
  }

  setInitialFormValues() {
    this.billsFormGroup.controls.shop.patchValue(
      this.cartService.cartItemDetails.shop
    );
    this.cartService.cartItemDetails.productList.forEach((product: any, index: number) => {
      // since we have already added single control so we neeed to add length - 1 controls 
      if (index) {
        this.addProduct();
      }
    });
    this.billsFormGroup.controls.productList.patchValue(
      this.cartService.cartItemDetails.productList
    );
  }

  private _filterShopName(value: string) {
    const filterValue = value.toLowerCase();
    return this.shopNameList.filter((option) =>
      `${option.ownerName} - ${option.shopName}`
        ?.toLowerCase()
        ?.includes(filterValue)
    );
  }
  
  shopSelectedEvent(event: MatAutocompleteSelectedEvent) {
    console.log("optionSelectedEvent", event);
  }

  onShopSearch(event: Event) {
    this.filteredShopList = of(this._filterShopName(this.billsFormGroup.controls.shop.value));
  }

  getShopDisplayValue(value: any) {
    if (value?.ownerName && value?.shopName) {
      return `${value?.ownerName} - ${value?.shopName}`;
    }
    return "";
  }

  get productListFormGroup(): FormArray {
    return this.billsFormGroup.get("productList") as FormArray;
  }

  addNextProductsEvent(event: Event) {
    this.addProduct();
    setTimeout(() => {
      window.scroll({
        top: this.element.nativeElement.scrollHeight,
        left: 0,
        behavior: "smooth"
      });
      this.setFocusToProductNameInput();
    });

  }

  handleUpdateCancelButtonClick() {
    this.isUpdateFormViewVisible = false;
  }

  handleUpdateButtonClick(event: Event) {

    this.billsFormGroup.get(["productList", this.indexOfChipSelectedForUpdate])?.setValue(event);

    this.isUpdateFormViewVisible = false;

    setTimeout(() => {
      this.setFocusToProductNameInput();
    });

  } 

  getProductName(indexOfProductNameInput: number) {
    let selectedProduct = this.productListFormGroup.controls[indexOfProductNameInput].value;
    return `${selectedProduct.product.productName} - ${selectedProduct.quantity} ${selectedProduct.quantityType}`;
  }

  editButtonClick(event: Event, indexOfChipClicked: number) {
    this.indexOfChipSelectedForUpdate = indexOfChipClicked;

    this.updateProductDetails = this.productListFormGroup.controls[indexOfChipClicked].value;
    
    this.isUpdateFormViewVisible = true;

  }

  removeProduct(i: number) {
    this.productListFormGroup.removeAt(i);
  } 

  setFocusToProductNameInput() {
    this.element.nativeElement.querySelector("#product-name-input").focus();
  }

  addedAllProductsEvent() {
    console.log(this.billsFormGroup.value);
    
    this.cartService.setCartItemDetails(this.billsFormGroup.value); 
    this.cartService.isCartDataAvaliable = true;
    this.router.navigateByUrl("/cart");
  }

  newProduct(): FormGroup {
    return this.formBuilder.group({
      product: ["", Validators.required],
      quantityType: ["", Validators.required],
      quantity: ["", Validators.required],
    });
  }

  addProduct() {
    this.productListFormGroup.push(this.newProduct());
  }

  onProductNameSearch(indexOfProductNameInput: number) {
    this.setFilteredProductsList(indexOfProductNameInput);
  }

  setFilteredProductsList(productNameInputIndex: number) {
    this.filteredProductNameList = of(
      this.getFilteredProductList(
        this.productListFormGroup.controls[productNameInputIndex].value.product
      )
    );
  }

  getFilteredProductList(value: string): any {
    return this.productList.filter((product) =>
      product.productName.toLowerCase().includes(value.toLowerCase())
    );
  }

  onProductSelected(event: MatAutocompleteSelectedEvent) {
    // set the selected product as the value of the productName field
    // this.formGroup.controls.productName.setValue(event.option.value);
  }

  getProductNameDisplayValue(value: any) {
    return value?.productName;
  }

  productNameSelectedEvent(event: MatAutocompleteSelectedEvent) {
    console.log("optionSelectedEvent", event);
  }
}
