import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GoldDataService, GoldPrice } from '../../services/gold-data.service';
import { AlertsService, AlertDirection, PriceAlert } from '../../core/alerts.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
})
export class AlertsComponent implements OnInit {
  alerts$: Observable<PriceAlert[]>;
  prices: GoldPrice[] = [];
  hasError = false;

  karat = '24';
  targetPrice: number | null = null;
  direction: AlertDirection = 'above';

  constructor(
    private readonly alertsService: AlertsService,
    private readonly goldService: GoldDataService
  ) {
    this.alerts$ = this.alertsService.alerts$;
  }

  ngOnInit(): void {
    this.goldService.getCurrentPrices().subscribe({
      next: prices => {
        this.prices = prices;
        const map: Record<string, number> = {};
        prices.forEach(p => (map[p.karat] = p.pricePerGram));
        this.alertsService.evaluate(map);
      },
      error: () => (this.hasError = true),
    });
  }

  get notificationsSupported(): boolean {
    return this.alertsService.notificationsSupported;
  }

  get notificationsEnabled(): boolean {
    return this.alertsService.notificationsEnabled;
  }

  priceFor(karat: string): number | null {
    return this.prices.find(p => p.karat === karat)?.pricePerGram ?? null;
  }

  enableNotifications(): void {
    this.alertsService.requestNotificationPermission();
  }

  addAlert(): void {
    if (!this.targetPrice || this.targetPrice <= 0) {
      return;
    }
    this.alertsService.add(this.karat, this.targetPrice, this.direction);
    this.targetPrice = null;
  }

  remove(id: string): void {
    this.alertsService.remove(id);
  }
}
