import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";

// COMPONENTS
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { PrintbillsComponent } from "./components/printbills/printbills.component";
import { CreatebillComponent } from "./components/bill/createbill/createbill.component";
import { UpdatebillComponent } from "./components/bill/updatebill/updatebill.component";
import { AddShopownerComponent } from "./components/shopowner/addshopowner/addshopowner.component";
import { UpdateComponent } from "./components/shopowner/update/update.component";
import { BillFormComponent } from "./components/bill/bill-form/bill-form.component";
import { AddproductComponent } from "./components/product/addproduct/addproduct.component";
import { UpdateproductComponent } from "./components/product/updateproduct/updateproduct.component";
import { MaterialModule } from "./material/material.module";
import { AutoFocusDirective } from "./directive/auto-focus.directive";
import { BasicInfoComponent } from "./components/basic-info/basic-info.component";
import { CartComponent } from "./components/cart/cart.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ListshopownerComponent } from './components/shopowner/listshopowner/listshopowner.component';
import { ListproductComponent } from './components/product/listproduct/listproduct.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrintbillsComponent,
    CreatebillComponent,
    UpdatebillComponent,
    AddShopownerComponent,
    UpdateComponent,
    BillFormComponent,
    AddproductComponent,
    UpdateproductComponent,
    AutoFocusDirective,
    BasicInfoComponent,
    CartComponent,
    DashboardComponent,
    ListshopownerComponent,
    ListproductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }]
})
export class AppModule {}
