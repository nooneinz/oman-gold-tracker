import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PriceCardsComponent } from './price-cards.component';
import { TranslatePipe } from '../../core/translate.pipe';

describe('PriceCardsComponent', () => {
  let fixture: ComponentFixture<PriceCardsComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceCardsComponent, TranslatePipe],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(PriceCardsComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('loads prices and history from the API and builds card view models', () => {
    fixture.detectChanges();
    httpTestingController.expectOne('http://localhost:5000/api/goldprices')
      .flush([{ karat: 24, pricePerGram: 53.84, currency: 'OMR' }]);
    httpTestingController.expectOne('http://localhost:5000/api/goldprices/history')
      .flush([
        { date: '2026-10-13', k18: 40, k21: 47, k22: 49, k24: 53 },
        { date: '2026-10-14', k18: 40.38, k21: 47.1, k22: 49.31, k24: 53.84 }
      ]);

    expect(fixture.componentInstance.cards[0].karat).toBe('24');
    expect(fixture.componentInstance.cards[0].pricePerGram).toBe(53.84);
    httpTestingController.verify();
  });
});
