import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { IncomeTransectionComponent } from './pages/income-transection/income-transection.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    IncomeTransectionComponent,
    AllUsersComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
