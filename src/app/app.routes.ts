import { HistoryLogComponent } from './pages/history-log/history-log.component';
import { IncomeComponent } from './pages/income/income.component';
import { RoznamchaComponent } from './pages/roznamcha/roznamcha.component';
import { ModuleWithProviders, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseComponent } from './pages/expense/expense.component';
import { AccountsComponent } from './pages/accounts/accounts.component';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'accounts',
        pathMatch: 'full'
    },
    { path: "accounts", component: AccountsComponent },
    { path: "expense", component: ExpenseComponent },
    { path: "income", component: IncomeComponent },
    { path: "log", component: HistoryLogComponent },


    { path: "roznamcha", component: RoznamchaComponent },
    { path: "**", component: AccountsComponent }
]

export const Routers: ModuleWithProviders = RouterModule.forRoot(appRoutes);
