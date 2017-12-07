import { RoznamchaComponent } from './pages/roznamcha/roznamcha.component';
import { ModuleWithProviders, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountsComponent } from './pages/accounts/accounts.component';
import { AddAccountComponent } from './pages/accounts/add-account/add-account.component';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'accounts',
        pathMatch: 'full'
    },
    { path: "accounts", component: AccountsComponent },
    { path: "addAccount", component: AddAccountComponent },
    { path: "roznamcha", component: RoznamchaComponent },
    { path: "**", component: AccountsComponent }
]

export const Routers: ModuleWithProviders = RouterModule.forRoot(appRoutes);
