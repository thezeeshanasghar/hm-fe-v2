import { ExchangeReciptComponent } from './pages/exchange-recipt/exchange-recipt.component';
import { UdharComponent } from './pages/udhar/udhar.component';
import { SaleToUnregisterUserComponent } from './pages/sale-to-unregister-user/sale-to-unregister-user.component';
import { SaleComponent } from './pages/sale/sale.component';
import { StockCarComponent } from './pages/stock-car/stock-car.component';
import { RoznamchaComponent } from './pages/roznamcha/roznamcha.component';
import { ModuleWithProviders, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { AddAccountComponent } from './pages/accounts/add-account/add-account.component';
import { LoginComponent } from './pages/login/login.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CarPurchaseComponent } from './pages/car-purchase/car-purchase.component';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    { path: "login", component: LoginComponent },
    {
        path: "dashboard",
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'accounts',
                pathMatch: 'full'
            },

            { path: "purchase", component: CarPurchaseComponent },
            { path: "exchangeRecipt", component: ExchangeReciptComponent },
            { path: "carStock", component: StockCarComponent },
           
            { path: "carSale", component: SaleToUnregisterUserComponent },
            { path: "udhar", component: UdharComponent },

            { path: "accounts", component: AccountsComponent },
            { path: "addAccount", component: AddAccountComponent },
            { path: "roznamcha", component: RoznamchaComponent },


        ]

    },


    // { path: "**", component: PageNotFoundComponent }
]

export const Routers: ModuleWithProviders = RouterModule.forRoot(appRoutes);
