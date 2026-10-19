import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';

import { ChartComponent } from './chart.component';
import { FormsModule } from '@angular/forms';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent],
      imports: [CommonModule, HttpClientTestingModule, FormsModule]
    });
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    httpTestingController.expectOne('http://localhost:5000/api/goldprices/history').flush([
      { date: '2026-10-13', k18: 40, k21: 47, k22: 49, k24: 53 },
      { date: '2026-10-14', k18: 41, k21: 48, k22: 50, k24: 54 }
    ]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    httpTestingController.verify();
  });
});
