import { Component, Input, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-updatebill",
  templateUrl: "./updatebill.component.html",
  styleUrls: ["./updatebill.component.scss"]
})
export class UpdatebillComponent {

  formGroup: FormGroup = this.formBuilder.group({
    productName: [""],
    quantityType: [""],
    quantity: [""],
  });

  @Input() set productDetails(value:any) {
    this.formGroup.setValue({
      productName: value.product,
      quantityType: value.quantityType,
      quantity: value.quantity
    });
  }
  
  @Output() cancelButtonClick = new EventEmitter();
  @Output() updateButtonClick = new EventEmitter();

  quantityTypes = ["Unit", "Pack", "Box"];

  // filteredProducts!: Observable<string[]>;
  filteredProducts!: Observable<any[]>;

  constructor(private formBuilder: FormBuilder) { }

  onProductNameSearch() {
    this.setFilteredProductsList();
  }

  setFilteredProductsList() {
    this.filteredProducts = of(
      this.filterProducts(
        this.formGroup.value.productName
      )
    );
  }

  filterProducts(value: string): any {
    // replace this with your own logic to filter products based on user input
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

  onUpdateButtonClick(event: Event) {
    this.updateButtonClick.emit(this.formGroup.value);
  }

  onCancelButtonClick(event: Event) {
    this.cancelButtonClick.emit();
  }

  getDisplayValue(value: any) {
    return value?.productName;
  }
}
