import { Http, HttpModule } from '@angular/http';
import { Routers } from './app.routes';
import { GeneralHttpService } from './services/general-http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RoznamchaComponent } from './pages/roznamcha/roznamcha.component';
import { AddAccountComponent } from './pages/accounts/add-account/add-account.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { IncomeComponent } from './pages/income/income.component';
import { HistoryLogComponent } from './pages/history-log/history-log.component';
import { AccountsComponent } from './pages/accounts/accounts.component';


@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    RoznamchaComponent,
    AddAccountComponent,
    ExpenseComponent,
    IncomeComponent,
    HistoryLogComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule ,
    Routers,
    HttpModule,
    
    
  ],
  providers: [GeneralHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
