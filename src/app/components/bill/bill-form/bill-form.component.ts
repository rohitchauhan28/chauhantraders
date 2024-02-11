import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-bill-form",
  templateUrl: "./bill-form.component.html",
  styleUrls: ["./bill-form.component.scss"]
})
export class BillFormComponent implements OnInit {
  formGroup!: FormGroup;
  quantityTypes = ["Unit", "Pack", "Box"];
  @ViewChild("el") element!: ElementRef;
  isUpdateFormViewVisible = false;
  // filteredProducts!: Observable<string[]>;
  filteredProducts!: Observable<any[]>;

  // need product interface
  updateProductDetails: any;

  // this property should derive from object
  indexOfChipSelectedForUpdate: number = 0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      products: this.formBuilder.array([
        this.formBuilder.group({
          productName: ["", Validators.required],
          quantityType: ["", Validators.required],
          quantity: ["", Validators.required],
        }),
      ]),
    });

    this.setFilteredProductsList(0);
  }

  filterProducts(value: string): any {
    const products = [
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
    return products.filter((product) =>
      product.productName.toLowerCase().includes(value.toLowerCase())
    );
  }

  onProductSelected(event: MatAutocompleteSelectedEvent) {
    // set the selected product as the value of the productName field
    // this.formGroup.controls.productName.setValue(event.option.value);
  }

  getDisplayValue(value: any) {
    return value?.productName;
  }

  get products(): FormArray {
    return this.formGroup.get("products") as FormArray;
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

  addedAllProductsEvent(event: Event) {
    console.log(this.formGroup.value);
  }

  getProductName(indexOfProductNameInput: number) {
    let selectedProduct = this.formGroup.controls.products.value[indexOfProductNameInput];
    return `${selectedProduct.productName.productName} - ${selectedProduct.quantity} ${selectedProduct.quantityType}`;
  }

  newProduct(): FormGroup {
    return this.formBuilder.group({
      productName: ["", Validators.required],
      quantityType: ["", Validators.required],
      quantity: ["", Validators.required],
    });
  }

  addProduct() {
    this.products.push(this.newProduct());
  }

  onProductNameSearch(indexOfProductNameInput: number) {
    this.setFilteredProductsList(indexOfProductNameInput);
  }

  setFilteredProductsList(indexOfProductNameInput: number) {
    this.filteredProducts = of(
      this.filterProducts(
        this.formGroup.controls.products.value[indexOfProductNameInput]
          .productName
      )
    );
  }

  getLastControlIndex() {
    return this.products.length - 1;
  }

  editButtonClick(event: Event, indexOfChipClicked: number) {
    this.indexOfChipSelectedForUpdate = indexOfChipClicked;

    this.updateProductDetails = this.formGroup.controls.products.value[indexOfChipClicked];
    
    this.isUpdateFormViewVisible = true;

  }

  removeProduct(i: number) {
    this.products.removeAt(i);
  }

  handleUpdateCancelButtonClick() {
    this.isUpdateFormViewVisible = false;
  }

  handleUpdateButtonClick(event: Event) {

    this.formGroup.get(["products", this.indexOfChipSelectedForUpdate])?.setValue(event);

    this.isUpdateFormViewVisible = false;

    setTimeout(() => {
      this.setFocusToProductNameInput();
    });

  } 

  setFocusToProductNameInput() {
    this.element.nativeElement.querySelector("#product-name-input").focus();
  }
}
