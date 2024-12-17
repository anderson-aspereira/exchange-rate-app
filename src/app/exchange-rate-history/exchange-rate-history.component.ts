import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExchangeRateHistory } from '../model/ExchangeRateHistory';
import { ExchangeRateHistoryService } from '../services/ExchangeRateHistoryService';

@Component({
  selector: 'app-exchange-rate-history',
  templateUrl: './exchange-rate-history.component.html',
  styleUrls: ['./exchange-rate-history.component.scss']
})
export class ExchangeRateHistoryComponent implements OnInit {

  exchangeRateHistory: ExchangeRateHistory[] = [];
  coin: string = "";


    constructor(public rest: ExchangeRateHistoryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getExchangeRateHistory();
  }

  getExchangeRateHistory(): void {
    this.rest.getExchangeRateHistory(this.route.snapshot.params['id']).subscribe({
      next: (resp) => {
        this.exchangeRateHistory = resp;
        if(this.exchangeRateHistory.length > 0){
          this.coin = this.exchangeRateHistory[0].code + ' to ' + this.exchangeRateHistory[0].codein
        }
        console.log(this.exchangeRateHistory);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => console.info('complete')
    });
  }

  voltar(): void {
    this.router.navigate(['/exchange-rate']);
  }
 

  

}

