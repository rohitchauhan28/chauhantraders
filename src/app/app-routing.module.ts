import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { PrintbillsComponent } from "./components/printbills/printbills.component";
import { CreatebillComponent } from "./components/bill/createbill/createbill.component";
import { UpdatebillComponent } from "./components/bill/updatebill/updatebill.component";
import { AddShopownerComponent } from "./components/shopowner/addshopowner/addshopowner.component";
import { UpdateComponent } from "./components/shopowner/update/update.component";
import { AddproductComponent } from "./components/product/addproduct/addproduct.component";
import { UpdateproductComponent } from "./components/product/updateproduct/updateproduct.component";
import { CartComponent } from "./components/cart/cart.component";
import { AuthGuard } from "./guards/auth.guard";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ListshopownerComponent } from "./components/shopowner/listshopowner/listshopowner.component";
import { ListproductComponent } from "./components/product/listproduct/listproduct.component";

const routes: Routes = [
  { 
    path: "", 
    redirectTo: "/login", 
    pathMatch: "full",
    data: {isHeaderEnabled: false}
  },
  { 
    path: "printbills", 
    component: PrintbillsComponent
  },
  { 
    path: "login", 
    component: LoginComponent,
    data: {isHeaderEnabled: false}
  },
  { 
    path: "dashboard", 
    component: DashboardComponent,
    data: {isHeaderEnabled: true}
  },
  {
    path: "bill",
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "create",
        component: CreatebillComponent,
        data: {isHeaderEnabled: true}
      },
      {
        path: "update",
        component: UpdatebillComponent,
        data: {isHeaderEnabled: true}
      },
    ],
  },
  {
    path: "product",
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "add",
        component: AddproductComponent,
        data: {isHeaderEnabled: true}
      },
      {
        path: "update",
        component: UpdateproductComponent,
        data: {isHeaderEnabled: true}
      },
      {
        path: "list",
        component: ListproductComponent,
        data: {isHeaderEnabled: true}
      },
    ],
  },
  {
    path: "shopowner",
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "add",
        component: AddShopownerComponent,
        data: {isHeaderEnabled: true}
      },
      {
        path: "update",
        component: UpdateComponent,
        data: {isHeaderEnabled: true}
      },
      {
        path: "list",
        component: ListshopownerComponent,
        data: {isHeaderEnabled: true}
      },
    ],
  },
  { 
    path: "cart", 
    component: CartComponent,
    data: {isHeaderEnabled: true}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
