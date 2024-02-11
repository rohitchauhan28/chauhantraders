import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IShopowner } from "src/app/interfaces/shopowner.interface";
import { ShopownerService } from "src/app/services/shopowner.service";

@Component({
  selector: "app-listshopowner",
  templateUrl: "./listshopowner.component.html",
  styleUrls: ["./listshopowner.component.scss"]
})
export class ListshopownerComponent implements OnInit {

  shopownerList!: IShopowner[];
  filteredShopownerList!: IShopowner[];

  filterForm!: FormGroup;

  isFilterApplied = false;

  filterType = [
    {value: "shopId", viewValue: "ShopId"},
    {value: "ownerName", viewValue: "Owner Name"},
    {value: "contactNumber", viewValue: "Contact Number"},
    {value: "address", viewValue: "Address"},
    {value: "shopName", viewValue: "Shop Name"},
  ];

  constructor(
    private _shopownerService: ShopownerService,
    private router: Router,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      filterSearchType: ["", Validators.required],
      filterText: ["", Validators.required]
    });
    this.shopownerList = this._shopownerService.getShopownerList();
    this.filteredShopownerList = this.shopownerList;
  }

  triggerEditHandler(shopId: number) {
    this.router.navigate(["shopowner", "add"], {queryParams: {id: shopId}});
  }

  filterList() {
    this.isFilterApplied = true;
    let filterType: string = this.filterForm.value.filterSearchType;
    let filterText: string = this.filterForm.value.filterText;
    this.filteredShopownerList = this.shopownerList.filter((shopowner: any) => shopowner[filterType].toString().includes(filterText));
  }

  resetList() {
    this.resetFilterForm();
    this.filteredShopownerList = this.shopownerList;
  }
  resetFilterForm() {
    Object.keys(this.filterForm.controls).forEach(key => {
      this.filterForm.get(key)?.reset();
      this.filterForm.get(key)?.markAsUntouched();
      this.filterForm.get(key)?.setErrors(null);
    });
  }
}
