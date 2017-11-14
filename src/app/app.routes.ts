import { AddUserComponent } from './pages/add-user/add-user.component';
import { ExpenseTransectionComponent } from './pages/expense-transection/expense-transection.component';
import { IncomeTransectionComponent } from './pages/income-transection/income-transection.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { ModuleWithProviders, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const appRoutes:Routes=[
    {
        path: '',
        redirectTo: 'allUsers',
        pathMatch: 'full'
    },

    {path:"income",component:IncomeTransectionComponent}
    ,{ path:"expense",component:ExpenseTransectionComponent},
    {path:"addUser",component:AddUserComponent},

 {path:"**",component:AllUsersComponent}   
]

export const Routers:ModuleWithProviders=RouterModule.forRoot(appRoutes);
