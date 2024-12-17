import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import { ExchangeRateHistoryComponent } from './exchange-rate-history/exchange-rate-history.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/exchange-rate',
    pathMatch: 'full'
  },
  {
    path: 'exchange-rate',
    component: ExchangeRateComponent,
    data: { title: 'Exchange Rate List' }
  },
  {
    path: 'exchange-rate-history/:id',
    component: ExchangeRateHistoryComponent,
    data: { title: 'Product Edit' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
