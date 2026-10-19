import { Component, OnInit } from '@angular/core';
import { GoldDataService, GoldPrice } from '../../services/gold-data.service';

type CalcMode = 'weight' | 'amount';
type WeightUnit = 'g' | 'oz';

const GRAMS_PER_OUNCE = 31.1034768;

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
})
export class CalculatorComponent implements OnInit {
  prices: GoldPrice[] = [];
  hasError = false;

  selectedKarat = '24';
  mode: CalcMode = 'weight';
  unit: WeightUnit = 'g';
  value: number | null = null;

  constructor(private readonly goldService: GoldDataService) {}

  ngOnInit(): void {
    this.goldService.getCurrentPrices().subscribe({
      next: prices => (this.prices = prices),
      error: () => (this.hasError = true),
    });
  }

  get pricePerGram(): number | null {
    return this.prices.find(p => p.karat === this.selectedKarat)?.pricePerGram ?? null;
  }

  /** Estimated value (weight mode) or estimated weight (amount mode); null until inputs are valid. */
  get result(): number | null {
    const price = this.pricePerGram;
    if (!price || !this.value || this.value <= 0) {
      return null;
    }
    if (this.mode === 'weight') {
      const grams = this.unit === 'oz' ? this.value * GRAMS_PER_OUNCE : this.value;
      return Number((price * grams).toFixed(3));
    }
    const grams = this.value / price;
    return Number((this.unit === 'oz' ? grams / GRAMS_PER_OUNCE : grams).toFixed(3));
  }

  focusForm(): void {
    document.getElementById('calc-value')?.focus();
  }
}
