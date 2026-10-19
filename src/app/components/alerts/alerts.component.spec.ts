import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsComponent } from './alerts.component';
import { TranslatePipe } from '../../core/translate.pipe';

describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    localStorage.removeItem('gold-alerts');
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, HttpClientTestingModule],
      declarations: [AlertsComponent, TranslatePipe]
    });
    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    httpTestingController.expectOne('http://localhost:5000/api/goldprices')
      .flush([{ karat: 24, pricePerGram: 53.84, currency: 'OMR' }]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    httpTestingController.verify();
  });

  it('adds an alert', () => {
    component.karat = '24';
    component.targetPrice = 55;
    component.direction = 'above';
    component.addAlert();

    component.alerts$.subscribe(alerts => {
      expect(alerts.length).toBe(1);
      expect(alerts[0].targetPrice).toBe(55);
    });
  });
});
