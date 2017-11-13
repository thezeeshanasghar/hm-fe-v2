import { GeneralHttpService } from './services/general-http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { IncomeTransectionComponent } from './pages/income-transection/income-transection.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { ExpenseTransectionComponent } from './pages/expense-transection/expense-transection.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    IncomeTransectionComponent,
    AllUsersComponent,
    ExpenseTransectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GeneralHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
