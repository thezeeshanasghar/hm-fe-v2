import { HistoryLogComponent } from './pages/history-log/history-log.component';
import { IncomeComponent } from './pages/income/income.component';
import { RoznamchaComponent } from './pages/roznamcha/roznamcha.component';
import { ModuleWithProviders, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAccountComponent } from './pages/add-account/add-account.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { AccountsComponent } from './pages/accounts/accounts.component';

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
    { path: "**", component: AccountsComponent }
]

export const Routers: ModuleWithProviders = RouterModule.forRoot(appRoutes);
