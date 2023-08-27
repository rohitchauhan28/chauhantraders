import { Component } from "@angular/core";

@Component({
  selector: "app-printbills",
  templateUrl: "./printbills.component.html",
  styleUrls: ["./printbills.component.scss"],
})
export class PrintbillsComponent {
  bills = [
    {
      id: 1,
      customerDetails: {
        name: "Rohit Chauhan",
        address: "Nanded",
        phoneNo: "9156044137",
      },
      dateOfPurchase: new Date(),
      purchaseItems: [
        { itemName: "colgate 10", quantity: "2P", price: "400" },
        { itemName: "colgate 20", quantity: "2P", price: "300" },
        { itemName: "colgate 20", quantity: "2P", price: "200" },
        { itemName: "colgate 20", quantity: "2P", price: "600" },
        { itemName: "colgate 20", quantity: "2P", price: "700" },
      ],
      totalPurchaseItemsPrice: 5000,
      totalPurchaseItemsCount: 5,
    },
    {
      id: 1,
      customerDetails: {
        name: "Rohit Chauhan",
        address: "Nanded",
        phoneNo: "9156044137",
      },
      dateOfPurchase: new Date(),
      purchaseItems: [
        { itemName: "colgate 10", quantity: "2P", price: "400" },
        { itemName: "colgate 20", quantity: "2P", price: "300" },
        { itemName: "colgate 20", quantity: "2P", price: "200" },
        { itemName: "colgate 20", quantity: "2P", price: "600" },
        { itemName: "colgate 10", quantity: "2P", price: "400" },
        { itemName: "colgate 20", quantity: "2P", price: "300" },
        { itemName: "colgate 20", quantity: "2P", price: "200" },
        { itemName: "colgate 20", quantity: "2P", price: "600" },
        { itemName: "colgate 20", quantity: "2P", price: "700" },
      ],
      totalPurchaseItemsPrice: 5000,
      totalPurchaseItemsCount: 5,
    },
    {
      id: 1,
      customerDetails: {
        name: "Rohit Chauhan",
        address: "Nanded",
        phoneNo: "9156044137",
      },
      dateOfPurchase: new Date(),
      purchaseItems: [
        { itemName: "colgate 10", quantity: "2P", price: "400" },
        { itemName: "colgate 20", quantity: "2P", price: "300" },
        { itemName: "colgate 20", quantity: "2P", price: "200" },
        { itemName: "colgate 20", quantity: "2P", price: "600" },
        { itemName: "colgate 10", quantity: "2P", price: "400" },
        { itemName: "colgate 20", quantity: "2P", price: "300" },
        { itemName: "colgate 20", quantity: "2P", price: "200" },
        { itemName: "colgate 20", quantity: "2P", price: "600" },
        { itemName: "colgate 20", quantity: "2P", price: "700" },
        { itemName: "colgate 10", quantity: "2P", price: "400" },
        { itemName: "colgate 20", quantity: "2P", price: "300" },
        { itemName: "colgate 20", quantity: "2P", price: "200" },
        { itemName: "colgate 20", quantity: "2P", price: "600" },
        { itemName: "colgate 20", quantity: "2P", price: "700" },
      ],
      totalPurchaseItemsPrice: 5000,
      totalPurchaseItemsCount: 5,
    },
    {
      id: 1,
      customerDetails: {
        name: "Rohit Chauhan",
        address: "Nanded",
        phoneNo: "9156044137",
      },
      dateOfPurchase: new Date(),
      purchaseItems: [
        { itemName: "colgate 10", quantity: "2P", price: "400" },
        { itemName: "colgate 20", quantity: "2P", price: "300" },
        { itemName: "colgate 20", quantity: "2P", price: "200" },
        { itemName: "colgate 20", quantity: "2P", price: "600" },
        { itemName: "colgate 20", quantity: "2P", price: "700" },
      ],
      totalPurchaseItemsPrice: 5000,
      totalPurchaseItemsCount: 5,
    },
    {
      id: 1,
      customerDetails: {
        name: "Rohit Chauhan",
        address: "Nanded",
        phoneNo: "9156044137",
      },
      dateOfPurchase: new Date(),
      purchaseItems: [
        { itemName: "colgate 10", quantity: "2P", price: "400" },
        { itemName: "colgate 20", quantity: "2P", price: "300" },
        { itemName: "colgate 20", quantity: "2P", price: "200" },
        { itemName: "colgate 20", quantity: "2P", price: "600" },
        { itemName: "colgate 20", quantity: "2P", price: "700" },
      ],
      totalPurchaseItemsPrice: 5000,
      totalPurchaseItemsCount: 5,
    },
    {
      id: 1,
      customerDetails: {
        name: "Rohit Chauhan",
        address: "Nanded",
        phoneNo: "9156044137",
      },
      dateOfPurchase: new Date(),
      purchaseItems: [
        { itemName: "colgate 10", quantity: "2P", price: "400" },
        { itemName: "colgate 20", quantity: "2P", price: "300" },
        { itemName: "colgate 20", quantity: "2P", price: "200" },
        { itemName: "colgate 20", quantity: "2P", price: "600" },
        { itemName: "colgate 20", quantity: "2P", price: "700" },
      ],
      totalPurchaseItemsPrice: 5000,
      totalPurchaseItemsCount: 5,
    },
    {
      id: 1,
      customerDetails: {
        name: "Rohit Chauhan",
        address: "Nanded",
        phoneNo: "9156044137",
      },
      dateOfPurchase: new Date(),
      purchaseItems: [
        { itemName: "colgate 10", quantity: "2P", price: "400" },
        { itemName: "colgate 20", quantity: "2P", price: "300" },
        { itemName: "colgate 20", quantity: "2P", price: "200" },
        { itemName: "colgate 20", quantity: "2P", price: "600" },
        { itemName: "colgate 20", quantity: "2P", price: "700" },
      ],
      totalPurchaseItemsPrice: 5000,
      totalPurchaseItemsCount: 5,
    },
    {
      id: 1,
      customerDetails: {
        name: "Rohit Chauhan",
        address: "Nanded",
        phoneNo: "9156044137",
      },
      dateOfPurchase: new Date(),
      purchaseItems: [
        { itemName: "colgate 10", quantity: "2P", price: "400" },
        { itemName: "colgate 20", quantity: "2P", price: "300" },
        { itemName: "colgate 20", quantity: "2P", price: "200" },
        { itemName: "colgate 20", quantity: "2P", price: "600" },
        { itemName: "colgate 20", quantity: "2P", price: "700" },
      ],
      totalPurchaseItemsPrice: 5000,
      totalPurchaseItemsCount: 5,
    },
    {
      id: 1,
      customerDetails: {
        name: "Rohit Chauhan",
        address: "Nanded",
        phoneNo: "9156044137",
      },
      dateOfPurchase: new Date(),
      purchaseItems: [
        { itemName: "colgate 10", quantity: "2P", price: "400" },
        { itemName: "colgate 20", quantity: "2P", price: "300" },
        { itemName: "colgate 20", quantity: "2P", price: "200" },
        { itemName: "colgate 20", quantity: "2P", price: "600" },
        { itemName: "colgate 20", quantity: "2P", price: "700" },
      ],
      totalPurchaseItemsPrice: 5000,
      totalPurchaseItemsCount: 5,
    },
    {
      id: 1,
      customerDetails: {
        name: "Rohit Chauhan",
        address: "Nanded",
        phoneNo: "9156044137",
      },
      dateOfPurchase: new Date(),
      purchaseItems: [
        { itemName: "colgate 10", quantity: "2P", price: "400" },
        { itemName: "colgate 20", quantity: "2P", price: "300" },
        { itemName: "colgate 20", quantity: "2P", price: "200" },
        { itemName: "colgate 20", quantity: "2P", price: "600" },
        { itemName: "colgate 20", quantity: "2P", price: "700" },
      ],
      totalPurchaseItemsPrice: 5000,
      totalPurchaseItemsCount: 5,
    },
    {
      id: 1,
      customerDetails: {
        name: "Rohit Chauhan",
        address: "Nanded",
        phoneNo: "9156044137",
      },
      dateOfPurchase: new Date(),
      purchaseItems: [
        { itemName: "colgate 10", quantity: "2P", price: "400" },
        { itemName: "colgate 20", quantity: "2P", price: "300" },
        { itemName: "colgate 20", quantity: "2P", price: "200" },
        { itemName: "colgate 20", quantity: "2P", price: "600" },
        { itemName: "colgate 10", quantity: "2P", price: "400" },
        { itemName: "colgate 20", quantity: "2P", price: "300" },
        { itemName: "colgate 20", quantity: "2P", price: "200" },
        { itemName: "colgate 20", quantity: "2P", price: "600" },
        { itemName: "colgate 20", quantity: "2P", price: "700" },
      ],
      totalPurchaseItemsPrice: 5000,
      totalPurchaseItemsCount: 5,
    },
    {
      id: 1,
      customerDetails: {
        name: "Rohit Chauhan",
        address: "Nanded",
        phoneNo: "9156044137",
      },
      dateOfPurchase: new Date(),
      purchaseItems: [
        { itemName: "colgate 10", quantity: "2P", price: "400" },
        { itemName: "colgate 20", quantity: "2P", price: "300" },
        { itemName: "colgate 20", quantity: "2P", price: "200" },
        { itemName: "colgate 20", quantity: "2P", price: "600" },
        { itemName: "colgate 20", quantity: "2P", price: "700" },
      ],
      totalPurchaseItemsPrice: 5000,
      totalPurchaseItemsCount: 5,
    },
    {
      id: 1,
      customerDetails: {
        name: "Rohit Chauhan",
        address: "Nanded",
        phoneNo: "9156044137",
      },
      dateOfPurchase: new Date(),
      purchaseItems: [
        { itemName: "colgate 10", quantity: "2P", price: "400" },
        { itemName: "colgate 20", quantity: "2P", price: "300" },
        { itemName: "colgate 20", quantity: "2P", price: "200" },
        { itemName: "colgate 20", quantity: "2P", price: "600" },
        { itemName: "colgate 10", quantity: "2P", price: "400" },
        { itemName: "colgate 20", quantity: "2P", price: "300" },
        { itemName: "colgate 20", quantity: "2P", price: "200" },
        { itemName: "colgate 20", quantity: "2P", price: "600" },
        { itemName: "colgate 20", quantity: "2P", price: "700" },
      ],
      totalPurchaseItemsPrice: 5000,
      totalPurchaseItemsCount: 5,
    },
  ];

  constructor() {}
}
