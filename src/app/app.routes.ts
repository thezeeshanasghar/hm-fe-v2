import { UdharComponent } from './pages/udhar/udhar.component';
import { SaleToUnregisterUserComponent } from './pages/sale-to-unregister-user/sale-to-unregister-user.component';
import { SaleComponent } from './pages/sale/sale.component';
import { StockCarComponent } from './pages/stock-car/stock-car.component';
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
    { path: "carStock", component: StockCarComponent },
    { path: "carSale", component: SaleComponent},
    { path: "carSaleUnregisterUser", component: SaleToUnregisterUserComponent},
    { path: "udhar", component: UdharComponent},

    { path: "accounts", component: AccountsComponent },
    { path: "addAccount", component: AddAccountComponent },
    { path: "roznamcha", component: RoznamchaComponent },
    { path: "**", component: AccountsComponent }
]

export const Routers: ModuleWithProviders = RouterModule.forRoot(appRoutes);
