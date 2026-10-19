import { Component, OnInit } from '@angular/core';
import { GoldDataService, HistoricalData } from '../../services/gold-data.service';

type KaratKey = 'k18' | 'k21' | 'k22' | 'k24';

interface PlottedPoint {
  date: string;
  value: number;
  x: number;
  y: number;
}

const VIEW_W = 720;
const VIEW_H = 240;
const PAD_Y = 14;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit {
  historyLogs: HistoricalData[] = [];
  hasError = false;
  selectedKarat: KaratKey = 'k24';
  days = 7;
  hoverIndex: number | null = null;

  readonly viewWidth = VIEW_W;
  readonly viewHeight = VIEW_H;

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
      next: history => (this.historyLogs = history),
      error: () => (this.hasError = true),
    });
  }

  private get values(): number[] {
    return this.historyLogs.slice(-this.days).map(h => h[this.selectedKarat]);
  }

  private get min(): number {
    return Math.min(...this.values);
  }

  private get max(): number {
    return Math.max(...this.values);
  }

  /** Padded axis range so the line never touches the frame. */
  private get axis(): { lo: number; hi: number } {
    const spread = this.max - this.min || 1;
    return { lo: this.min - spread * 0.15, hi: this.max + spread * 0.15 };
  }

  get points(): PlottedPoint[] {
    const rows = this.historyLogs.slice(-this.days);
    if (!rows.length) {
      return [];
    }
    const { lo, hi } = this.axis;
    return rows.map((row, i) => {
      const value = row[this.selectedKarat];
      return {
        date: this.formatDate(row.date),
        value,
        x: rows.length > 1 ? (i / (rows.length - 1)) * VIEW_W : VIEW_W / 2,
        y: PAD_Y + ((hi - value) / (hi - lo)) * (VIEW_H - PAD_Y * 2),
      };
    });
  }

  get linePath(): string {
    return this.points.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  }

  get areaPath(): string {
    const pts = this.points;
    return pts.length ? `${this.linePath} L${pts[pts.length - 1].x},${VIEW_H} L${pts[0].x},${VIEW_H} Z` : '';
  }

  get yLabels(): number[] {
    const { lo, hi } = this.axis;
    return [0, 1, 2, 3, 4].map(i => hi - ((hi - lo) / 4) * i);
  }

  get xLabels(): string[] {
    const pts = this.points;
    const target = Math.min(8, pts.length);
    if (!target) {
      return [];
    }
    return Array.from({ length: target }, (_, i) => pts[Math.round((i / Math.max(1, target - 1)) * (pts.length - 1))].date);
  }

  get highest(): number {
    return this.values.length ? this.max : 0;
  }

  get dailyChange(): number {
    const v = this.values;
    const prev = v[v.length - 2];
    return prev ? Number((((v[v.length - 1] - prev) / prev) * 100).toFixed(2)) : 0;
  }

  get hoverPoint(): PlottedPoint | null {
    return this.hoverIndex !== null ? this.points[this.hoverIndex] ?? null : null;
  }

  get karatLabel(): string {
    return this.karats.find(k => k.key === this.selectedKarat)?.label ?? '';
  }

  onMove(event: MouseEvent): void {
    const rect = (event.currentTarget as SVGSVGElement).getBoundingClientRect();
    const count = this.points.length;
    if (!rect.width || !count) {
      return;
    }
    const ratio = (event.clientX - rect.left) / rect.width;
    this.hoverIndex = Math.min(count - 1, Math.max(0, Math.round(ratio * (count - 1))));
  }

  onLeave(): void {
    this.hoverIndex = null;
  }

  private formatDate(raw: string): string {
    const d = new Date(raw);
    return isNaN(d.getTime()) ? raw : d.toLocaleDateString('ar-OM-u-nu-latn', { day: 'numeric', month: 'short' });
  }
}
