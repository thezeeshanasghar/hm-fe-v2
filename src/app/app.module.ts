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
import { ModalModule, AlertModule, BsDatepickerModule } from 'ngx-bootstrap';
import { MyDatePickerModule } from 'mydatepicker';
import { StockCarComponent } from './pages/stock-car/stock-car.component';

import { SaleToUnregisterUserComponent } from './pages/sale-to-unregister-user/sale-to-unregister-user.component';
import { UdharComponent } from './pages/udhar/udhar.component';
import { ExchangeReciptComponent } from './pages/exchange-recipt/exchange-recipt.component';
import { CarService } from './services/car/car.service';
import { LoginComponent } from './pages/login/login.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { CarPurchaseComponent } from './pages/car-purchase/car-purchase.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddCarComponent } from './pages/stock-car/add-car/add-car.component';
import { ListCarsComponent } from './pages/stock-car/list-cars/list-cars.component';
import { EditCarComponent } from './pages/stock-car/edit-car/edit-car.component';
import { EditCarPurchaseComponent } from './pages/car-purchase/edit-car-purchase/edit-car-purchase.component';
import { AddCarPurchaseComponent } from './pages/car-purchase/add-car-purchase/add-car-purchase.component';
import { ListCarPurchaseComponent } from './pages/car-purchase/list-car-purchase/list-car-purchase.component';
import { CarPurchaseService } from './services/car/car-purchase.service';
import { AuthGuard } from './router-guard/auth.guard';
import { CarSaleComponent } from './pages/car-sale/car-sale.component';
import { CarSaleListComponent } from './pages/car-sale/car-sale-list/car-sale-list.component';
import { SaleComponent } from './pages/car-sale/sale/sale.component';


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

    SaleToUnregisterUserComponent,
    UdharComponent,
    ExchangeReciptComponent,
    LoginComponent,

    DashboardComponent,
    SearchFilterPipe,
    CarPurchaseComponent,
    ReversePipe,
    AddCarComponent,
    ListCarsComponent,
    EditCarComponent,
    EditCarPurchaseComponent,
    AddCarPurchaseComponent,
    ListCarPurchaseComponent,
    CarSaleComponent,
    CarSaleListComponent,
    SaleComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Routers,
    HttpModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    MyDatePickerModule,
    Ng2SearchPipeModule,
    BsDatepickerModule.forRoot(),


  ],
  providers: [AuthGuard, GeneralHttpService, CarService, CarPurchaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
