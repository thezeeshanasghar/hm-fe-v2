import { Http, HttpModule } from '@angular/http';
import { Routers } from './app.routes';
import { GeneralHttpService } from './services/general-http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AllUsersComponent } from './pages/all-users/all-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RoznamchaComponent } from './pages/roznamcha/roznamcha.component';
import { AddAccountComponent } from './pages/add-account/add-account.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { IncomeComponent } from './pages/income/income.component';

@NgModule({
  declarations: [
    AppComponent,
    AllUsersComponent,
    ExpenseComponent,
    RoznamchaComponent,
    AddAccountComponent,
    ExpenseComponent,
    IncomeComponent
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
