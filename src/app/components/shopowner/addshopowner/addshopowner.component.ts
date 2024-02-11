import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Route } from "@angular/router";
import { IShopowner } from "src/app/interfaces/shopowner.interface";
import { DataService } from "src/app/services/data.service";
import { ShopownerService } from "src/app/services/shopowner.service";

@Component({
  selector: "app-addshopowner",
  templateUrl: "./addshopowner.component.html",
  styleUrls: ["./addshopowner.component.scss"],
})
export class AddShopownerComponent {
  myForm: FormGroup;

  shopId = "";

  isDisabled = false;

  constructor(
    private fb: FormBuilder,
    private shopownerService: ShopownerService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {
    this.myForm = this.fb.group({
      ownerName: ["", Validators.required],
      contactNumber: ["", Validators.required],
      address: [""],
      shopName: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.shopId = this.route.snapshot.queryParams["id"] ?? "";
    if (!this.shopId) return;
    let shopowner = this.shopownerService.getShopownerListByShopId(+this.shopId)[0];
    this.myForm.setValue({
      ownerName :shopowner.ownerName,
      contactNumber :shopowner.contactNumber,
      address :shopowner.address,
      shopName :shopowner.shopName,
    })
  }

  onSubmit() {
    this.isDisabled = true;
    let shopownerDetail = {
      ...this.myForm.value,
    };
    if (this.shopId) {
      shopownerDetail.shopId = +this.shopId;
      this.shopownerService.updateShopowner(shopownerDetail);

    }else {
      shopownerDetail.shopId = this.shopownerService.getShopownerList().length + 1;
      this.shopownerService.addShopowner(shopownerDetail);
    }
    this.dataService.uploadData().subscribe(() => {
      this.myForm.reset();
      Object.keys(this.myForm.controls).forEach(key => {
        this.myForm.get(key)?.reset();
        this.myForm.get(key)?.markAsUntouched();
        this.myForm.get(key)?.setErrors(null);
      });
      this.isDisabled = false;
      history.back();
    });
  }
}
