import { Http, HttpModule } from '@angular/http';
import { Routers } from './app.routes';
import { GeneralHttpService } from './services/general-http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RoznamchaComponent } from './pages/roznamcha/roznamcha.component';
import { AddAccountComponent } from './pages/accounts/add-account/add-account.component';
import { ExpenseComponent } from './pages/accounts/expense/expense.component';
import { IncomeComponent } from './pages/accounts/income/income.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { ModalModule, AlertModule } from 'ngx-bootstrap';
import { MyDatePickerModule } from 'mydatepicker';
import { StockCarComponent } from './pages/stock-car/stock-car.component';
import { SaleComponent } from './pages/sale/sale.component';
import { SaleToUnregisterUserComponent } from './pages/sale-to-unregister-user/sale-to-unregister-user.component';
import { UdharComponent } from './pages/udhar/udhar.component';
import { ExchangeReciptComponent } from './pages/exchange-recipt/exchange-recipt.component';
import { CarService } from './services/car/car.service';
import { LoginComponent } from './pages/login/login.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { CarPurchaseComponent } from './pages/car-purchase/car-purchase.component';


@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    RoznamchaComponent,
    AddAccountComponent,
    ExpenseComponent,
    IncomeComponent,
    AccountsComponent,
    StockCarComponent,
    SaleComponent,
    SaleToUnregisterUserComponent,
    UdharComponent,
    ExchangeReciptComponent,
    LoginComponent,

    DashboardComponent,
    SearchFilterPipe,
    CarPurchaseComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule ,
    Routers,
    HttpModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    MyDatePickerModule
    
  ],
  providers: [GeneralHttpService,CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
