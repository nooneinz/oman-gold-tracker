import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { GoldDataService, GoldPrice, HistoricalData } from '../../services/gold-data.service';

export interface PriceCardViewModel {
  karat: string;
  pricePerGram: number;
  changePercent: number;
}

type KaratField = 'k18' | 'k21' | 'k22' | 'k24';

@Component({
  selector: 'app-price-cards',
  templateUrl: './price-cards.component.html',
})
export class PriceCardsComponent implements OnInit {
  cards: PriceCardViewModel[] = [];
  hasError = false;

  constructor(private readonly goldService: GoldDataService) {}

  ngOnInit(): void {
    forkJoin({
      prices: this.goldService.getCurrentPrices(),
      history: this.goldService.get30DayHistory(),
    }).subscribe({
      next: ({ prices, history }) => (this.cards = this.buildCards(prices, history)),
      error: () => (this.hasError = true),
    });
  }

  private buildCards(prices: GoldPrice[], history: HistoricalData[]): PriceCardViewModel[] {
    return [...prices]
      .sort((a, b) => Number(a.karat) - Number(b.karat))
      .map(price => {
        const field = `k${price.karat}` as KaratField;
        const values = history.map(day => day[field]).filter(v => typeof v === 'number');
        const previous = values[values.length - 2];
        const changePercent = previous ? Number((((price.pricePerGram - previous) / previous) * 100).toFixed(2)) : 0;
        return { karat: price.karat, pricePerGram: price.pricePerGram, changePercent };
      });
  }
}
