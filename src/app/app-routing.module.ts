import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { PrintbillsComponent } from "./components/printbills/printbills.component";
import { CreatebillComponent } from "./components/bill/createbill/createbill.component";
import { UpdatebillComponent } from "./components/bill/updatebill/updatebill.component";
import { AddComponent } from "./components/shopowner/add/add.component";
import { UpdateComponent } from "./components/shopowner/update/update.component";
import { AddproductComponent } from "./components/product/addproduct/addproduct.component";
import { UpdateproductComponent } from "./components/product/updateproduct/updateproduct.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "printbills", component: PrintbillsComponent },
  { path: "login", component: LoginComponent },
  {
    path: "bill",
    children: [
      {
        path: "create",
        component: CreatebillComponent,
      },
      {
        path: "update",
        component: UpdatebillComponent,
      },
    ],
  },
  {
    path: "product",
    children: [
      {
        path: "create",
        component: AddproductComponent,
      },
      {
        path: "update",
        component: UpdateproductComponent,
      },
    ],
  },
  {
    path: "shopowner",
    children: [
      {
        path: "add",
        component: AddComponent,
      },
      {
        path: "update",
        component: UpdateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
