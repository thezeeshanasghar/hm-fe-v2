import { HistoryLogComponent } from './pages/history-log/history-log.component';
import { IncomeComponent } from './pages/income/income.component';
import { RoznamchaComponent } from './pages/roznamcha/roznamcha.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { ModuleWithProviders, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAccountComponent } from './pages/add-account/add-account.component';
import { ExpenseComponent } from './pages/expense/expense.component';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'allUsers',
        pathMatch: 'full'
    },
    { path: "expense", component: ExpenseComponent },
    { path: "income", component: IncomeComponent },
    { path: "addAccount", component: AddAccountComponent },
    { path: "log", component: HistoryLogComponent },


    { path: "roznamcha", component: RoznamchaComponent },
    { path: "**", component: AllUsersComponent }
]

export const Routers: ModuleWithProviders = RouterModule.forRoot(appRoutes);
