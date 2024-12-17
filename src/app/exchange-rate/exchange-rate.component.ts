import { Component, OnInit } from '@angular/core';
import { ExchangeRate } from '../model/ExchangeRate';
import { ExchangeRateService } from '../services/ExchangeRateService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss']
})
export class ExchangeRateComponent implements OnInit {

  exchangeRate: ExchangeRate[] = [];
  

  constructor(
    public rest: ExchangeRateService,
    private router: Router) { }

  ngOnInit(): void {
    this.listExchangeRate();
  }

  listExchangeRate(): void {
    this.rest.listExchangeRate().subscribe({
      next: (resp) => {
        this.exchangeRate = resp;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => console.info('complete')
    });
  }

  updateExchangeRate(): void {
    this.rest.listExchangeRate()
    this.rest.updateExchangeRate().subscribe({
      next: (resp) => {
        this.exchangeRate = resp;
        this.listExchangeRate()
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => console.info('complete')
    });

  }

 

}
