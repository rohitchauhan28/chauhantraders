import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { of } from "rxjs";

@Component({
  selector: "app-createbill",
  templateUrl: "./createbill.component.html",
  styleUrls: ["./createbill.component.scss"],
})
export class CreatebillComponent {
  myControl = new FormControl();
  options = [
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
  // filteredOptions!: Observable<string[]>;

  filteredOptions!: any;

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      `${option.ownerName} - ${option.shopName}`
        .toLowerCase()
        .includes(filterValue)
    );
  }

  optionSelectedEvent(event: MatAutocompleteSelectedEvent) {
    console.log("optionSelectedEvent", event);
  }

  onSearch(event: Event) {
    this.filteredOptions = of(this._filter(this.myControl.value));
  }

  getDisplayValue(value: any) {
    return `${value.ownerName} - ${value.shopName}`;
  }
}
