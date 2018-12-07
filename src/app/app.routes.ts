import { PrintAccountDetilsComponent } from './pages/accounts/print-account-detils/print-account-detils.component';
import { ListExchangeCarComponent } from './pages/exchange-recipt/list-exchange-car/list-exchange-car.component';
import { AddExchangeCarComponent } from './pages/exchange-recipt/add-exchange-car/add-exchange-car.component';
import { CarSaleComponent } from './pages/car-sale/car-sale.component';
import { ExchangeReciptComponent } from './pages/exchange-recipt/exchange-recipt.component';
import { UdharComponent } from './pages/udhar/udhar.component';
import { SaleToUnregisterUserComponent } from './pages/sale-to-unregister-user/sale-to-unregister-user.component';

import { StockCarComponent } from './pages/stock-car/stock-car.component';
import { RoznamchaComponent } from './pages/roznamcha/roznamcha.component';
import { ModuleWithProviders, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { AddAccountComponent } from './pages/accounts/add-account/add-account.component';
import { LoginComponent } from './pages/login/login.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CarPurchaseComponent } from './pages/car-purchase/car-purchase.component';
import { AddCarComponent } from './pages/stock-car/add-car/add-car.component';
import { ListCarsComponent } from './pages/stock-car/list-cars/list-cars.component';
import { EditCarComponent } from './pages/stock-car/edit-car/edit-car.component';
import { AddCarPurchaseComponent } from './pages/car-purchase/add-car-purchase/add-car-purchase.component';
import { ListCarPurchaseComponent } from './pages/car-purchase/list-car-purchase/list-car-purchase.component';
import { EditCarPurchaseComponent } from './pages/car-purchase/edit-car-purchase/edit-car-purchase.component';
import { AuthGuard } from './router-guard/auth.guard';
import { SaleComponent } from './pages/car-sale/sale/sale.component';
import { CarSaleListComponent } from './pages/car-sale/car-sale-list/car-sale-list.component';
import { PrintRoznamchaComponent } from './pages/roznamcha/print-roznamcha/print-roznamcha.component';
import { PrintRoznamchaIncomeComponent } from './pages/roznamcha/print-roznamcha-income/print-roznamcha-income.component';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    { path: "login", component: LoginComponent },
    { path: "printHistory", component: PrintAccountDetilsComponent },

    { path: "printRoznamcha", component: PrintRoznamchaComponent },
    { path: "printRoznamchaIncome", component: PrintRoznamchaIncomeComponent },


    {
        path: "dashboard",
        component: DashboardComponent,
        // canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'accounts',
                pathMatch: 'full'
            },

            // { path: "exchangeRecipt", component: ExchangeReciptComponent },

            { path: "udhar", component: UdharComponent },

            { path: "accounts", component: AccountsComponent },
            { path: "addAccount", component: AddAccountComponent },
            { path: "roznamcha", component: RoznamchaComponent },

            {
                path: "carExchange",
                component: ExchangeReciptComponent,
                children: [
                    { path: '', redirectTo: 'add', pathMatch: 'full' },
                    { path: 'add', component: AddExchangeCarComponent },
                    { path: 'list', component: ListExchangeCarComponent },

                ]

            },


            {
                path: "carStock",
                component: StockCarComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'add', component: AddCarComponent },
                    { path: 'list', component: ListCarsComponent },
                    { path: 'edit/:id', component: EditCarComponent }

                ]
            },

            {
                path: "car-purchase",
                component: CarPurchaseComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: ListCarPurchaseComponent },
                    { path: 'add', component: AddCarPurchaseComponent },
                    { path: 'edit', component: EditCarPurchaseComponent }

                ]
            },

            {
                path: "car-sale",
                component: CarSaleComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: CarSaleListComponent },
                    { path: 'add', component: SaleComponent },


                ]
            }


        ]

    },


    // { path: "**", component: PageNotFoundComponent }
]

export const Routers: ModuleWithProviders = RouterModule.forRoot(appRoutes);
