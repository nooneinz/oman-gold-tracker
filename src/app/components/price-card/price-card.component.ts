import { Component, Input } from '@angular/core';
import { PriceCardViewModel } from '../price-cards/price-cards.component';

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
})
export class PriceCardComponent {
  @Input() card!: PriceCardViewModel;
}
