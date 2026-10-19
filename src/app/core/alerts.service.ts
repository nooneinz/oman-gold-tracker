import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AlertDirection = 'above' | 'below';

export interface PriceAlert {
  id: string;
  karat: string;
  targetPrice: number;
  direction: AlertDirection;
  createdAt: number;
  triggered: boolean;
}

const STORAGE_KEY = 'gold-alerts';

@Injectable({ providedIn: 'root' })
export class AlertsService {
  private readonly alertsSubject = new BehaviorSubject<PriceAlert[]>(this.readStored());
  readonly alerts$ = this.alertsSubject.asObservable();

  get notificationsSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  }

  get notificationsEnabled(): boolean {
    return this.notificationsSupported && Notification.permission === 'granted';
  }

  async requestNotificationPermission(): Promise<boolean> {
    if (!this.notificationsSupported) {
      return false;
    }
    if (Notification.permission === 'granted') {
      return true;
    }
    try {
      const result = await Notification.requestPermission();
      return result === 'granted';
    } catch {
      return false;
    }
  }

  add(karat: string, targetPrice: number, direction: AlertDirection): void {
    const alert: PriceAlert = {
      id: `${Date.now()}-${Math.round(Math.random() * 1000)}`,
      karat,
      targetPrice,
      direction,
      createdAt: Date.now(),
      triggered: false,
    };
    const next = [alert, ...this.alertsSubject.value];
    this.persist(next);
  }

  remove(id: string): void {
    this.persist(this.alertsSubject.value.filter(a => a.id !== id));
  }

  clearAll(): void {
    this.persist([]);
  }

  /** Compare current karat prices against active alerts and flag/notify matches. */
  evaluate(pricesByKarat: Record<string, number>): void {
    let changed = false;
    const next = this.alertsSubject.value.map(alert => {
      if (alert.triggered) {
        return alert;
      }
      const price = pricesByKarat[alert.karat];
      if (price === undefined) {
        return alert;
      }
      const hit = alert.direction === 'above' ? price >= alert.targetPrice : price <= alert.targetPrice;
      if (!hit) {
        return alert;
      }
      changed = true;
      this.notify(alert, price);
      return { ...alert, triggered: true };
    });
    if (changed) {
      this.persist(next);
    }
  }

  private notify(alert: PriceAlert, price: number): void {
    if (!this.notificationsEnabled) {
      return;
    }
    try {
      new Notification('الذهب العُماني · Oman Gold', {
        body: `عيار ${alert.karat} وصل إلى ${price.toFixed(3)} ر.ع / Karat ${alert.karat} reached ${price.toFixed(3)} OMR`,
        icon: 'assets/images/logo.png',
      });
    } catch {
      /* notifications may be blocked at the OS level */
    }
  }

  private persist(alerts: PriceAlert[]): void {
    this.alertsSubject.next(alerts);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
    } catch {
      /* ignore */
    }
  }

  private readStored(): PriceAlert[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as PriceAlert[]) : [];
    } catch {
      return [];
    }
  }
}
