import { Component, OnInit } from '@angular/core';
import { GoldDataService, HistoricalData } from '../../services/gold-data.service';

type KaratKey = 'k18' | 'k21' | 'k22' | 'k24';

interface HistoryRow {
  date: string;
  price: number;
  changePercent: number;
}

const PAGE_SIZE = 4;

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
})
export class HistoryTableComponent implements OnInit {
  history: HistoricalData[] = [];
  hasError = false;
  karat: KaratKey = 'k24';
  days = 30;
  descending = true;
  page = 1;

  readonly karats: { label: string; key: KaratKey }[] = [
    { label: 'عيار 18', key: 'k18' },
    { label: 'عيار 21', key: 'k21' },
    { label: 'عيار 22', key: 'k22' },
    { label: 'عيار 24', key: 'k24' },
  ];

  readonly periods = [
    { label: 'آخر 7 أيام', days: 7 },
    { label: 'آخر 14 يومًا', days: 14 },
    { label: 'آخر 30 يومًا', days: 30 },
  ];

  constructor(private readonly goldService: GoldDataService) {}

  ngOnInit(): void {
    this.goldService.get30DayHistory().subscribe({
      next: history => (this.history = history),
      error: () => (this.hasError = true),
    });
  }

  get karatLabel(): string {
    return this.karats.find(k => k.key === this.karat)?.label ?? '';
  }

  get rows(): HistoryRow[] {
    const slice = this.history.slice(-this.days);
    const rows = slice.map((item, i) => {
      const prev = i > 0 ? slice[i - 1][this.karat] : null;
      const price = item[this.karat];
      return {
        date: this.formatDate(item.date),
        price,
        changePercent: prev ? Number((((price - prev) / prev) * 100).toFixed(2)) : 0,
      };
    });
    return this.descending ? rows.reverse() : rows;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.rows.length / PAGE_SIZE));
  }

  get pagedRows(): HistoryRow[] {
    const start = (Math.min(this.page, this.totalPages) - 1) * PAGE_SIZE;
    return this.rows.slice(start, start + PAGE_SIZE);
  }

  resetPage(): void {
    this.page = 1;
  }

  toggleSort(): void {
    this.descending = !this.descending;
    this.page = 1;
  }

  goToPage(page: number): void {
    this.page = Math.min(this.totalPages, Math.max(1, page));
  }

  private formatDate(raw: string): string {
    const d = new Date(raw);
    return isNaN(d.getTime()) ? raw : d.toLocaleDateString('ar-OM-u-nu-latn', { day: 'numeric', month: 'long', year: 'numeric' });
  }
}
