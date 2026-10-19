import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let component: CalculatorComponent;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      imports: [FormsModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    httpTestingController.expectOne('http://localhost:5000/api/goldprices').flush([
      { karat: 24, pricePerGram: 53.84, currency: 'OMR' },
      { karat: 21, pricePerGram: 47.1, currency: 'OMR' }
    ]);
  });

  it('calculates the total value using the price returned by the API', () => {
    component.value = 2;
    expect(component.result).toBe(107.68);
    httpTestingController.verify();
  });

  it('uses the selected karat price', () => {
    component.selectedKarat = '21';
    component.value = 10;
    expect(component.result).toBe(471);
  });

  it('calculates the estimated weight from an amount', () => {
    component.mode = 'amount';
    component.value = 107.68;
    expect(component.result).toBe(2);
  });

  it('returns null until a valid value is entered', () => {
    expect(component.result).toBeNull();
  });
});
