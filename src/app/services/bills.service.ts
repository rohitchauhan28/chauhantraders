import { Injectable } from "@angular/core";
import { IBill } from "../interfaces/bill.interface";

@Injectable({
  providedIn: "root"
})
export class BillsService {

  billList!: IBill[];

  constructor() { }

  getBillList() {
    return this.billList;
  }
  setBillList(billList: any) {
    this.billList = billList;
  }
  addBill(bill: any) {
    this.billList.push(bill);
  }
}
