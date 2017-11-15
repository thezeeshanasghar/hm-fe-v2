import { Http, HttpModule } from '@angular/http';
import { Routers } from './app.routes';
import { GeneralHttpService } from './services/general-http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { IncomeTransectionComponent } from './pages/income-transection/income-transection.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { ExpenseTransectionComponent } from './pages/expense-transection/expense-transection.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RoznamchaComponent } from './pages/roznamcha/roznamcha.component';
import { AddAccountComponent } from './pages/add-account/add-account.component';

@NgModule({
  declarations: [
    AppComponent,
    IncomeTransectionComponent,
    AllUsersComponent,
    ExpenseTransectionComponent,
    RoznamchaComponent,
    AddAccountComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule ,
    Routers,
    HttpModule
  ],
  providers: [GeneralHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
