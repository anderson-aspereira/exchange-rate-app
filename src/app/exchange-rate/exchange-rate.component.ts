import { Component, OnInit, ViewChild } from '@angular/core';
import { ExchangeRate } from '../model/ExchangeRate';
import { ExchangeRateService } from '../services/ExchangeRateService';
import { Router } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss']
})


export class ExchangeRateComponent implements OnInit {

  exchangeRateList: ExchangeRate[] = [];
  values= 'BRL USD'.split(' ');
  selectedCode: string ="BRL";
 
  constructor(
    public rest: ExchangeRateService,
    private router: Router) { }

  ngOnInit(): void {
    this.listExchangeRate(this.selectedCode);

  }

  onChange(e:any) {
   
    this.selectedCode = e.target.value;
    this.listExchangeRate(this.selectedCode);
}

  listExchangeRate(code:string): void {
    this.rest.listExchangeRate(code).subscribe({
      next: (resp) => {
        this.exchangeRateList = resp;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => console.info('complete')
    });
  }

  updateExchangeRate(): void {
   
    this.rest.updateExchangeRate(this.selectedCode).subscribe({
      next: (resp) => {
        this.exchangeRateList = resp;
        this.listExchangeRate(this.selectedCode);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => console.info('complete')
    });

  }

 

}

