import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryTableComponent } from './history-table.component';
import { FormsModule } from '@angular/forms';

describe('HistoryTableComponent', () => {
  let fixture: ComponentFixture<HistoryTableComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryTableComponent],
      imports: [HttpClientTestingModule, FormsModule]
    });
    fixture = TestBed.createComponent(HistoryTableComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('loads history from the API', () => {
    fixture.detectChanges();
    httpTestingController.expectOne('http://localhost:5000/api/goldprices/history').flush([
      { date: '2026-10-14', k18: 40.38, k21: 47.1, k22: 49.31, k24: 53.84 }
    ]);

    expect(fixture.componentInstance.rows.length).toBe(1);
    httpTestingController.verify();
  });
});