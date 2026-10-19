import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GoldDataService } from './gold-data.service';

describe('GoldDataService', () => {
  let service: GoldDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(GoldDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('requests a specific karat from the API', () => {
    service.getPriceByKarat('21').subscribe(price => expect(price.karat).toBe('21'));
    httpTestingController.expectOne('http://localhost:5000/api/goldprices/21')
      .flush({ karat: 21, pricePerGram: 47.1, currency: 'OMR' });
    httpTestingController.verify();
  });
});
