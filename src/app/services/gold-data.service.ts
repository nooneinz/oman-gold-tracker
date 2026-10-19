import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface GoldPrice {
  karat: string;
  pricePerGram: number;
}

export interface HistoricalData {
  date: string;
  k18: number;
  k21: number;
  k22: number;
  k24: number;
}

@Injectable({
  providedIn: 'root'
})
export class GoldDataService {
  private readonly apiUrl = 'http://localhost:5000/api/goldprices';

  constructor(private http: HttpClient) {}

  getCurrentPrices(): Observable<GoldPrice[]> {
    return this.http.get<{ karat: number; pricePerGram: number }[]>(this.apiUrl).pipe(
      map(prices => prices.map(price => ({ ...price, karat: String(price.karat) })))
    );
  }

  getPriceByKarat(karat: string): Observable<GoldPrice> {
    return this.http.get<{ karat: number; pricePerGram: number }>(`${this.apiUrl}/${karat}`).pipe(
      map(price => ({ ...price, karat: String(price.karat) }))
    );
  }

  get30DayHistory(): Observable<HistoricalData[]> {
    return this.http.get<HistoricalData[]>(`${this.apiUrl}/history`);
  }
}