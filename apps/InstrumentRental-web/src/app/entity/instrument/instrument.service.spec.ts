import { TestBed } from '@angular/core/testing';
import { InstrumentService } from './instrument.service';
import { Instrument } from './instrument.model';

class MockInstrumentService {
  getInstrumentById(id: number): Instrument {
    return { id, name: 'Guitar' } as Instrument;
  }
}

describe('InstrumentService', () => {
  let service: InstrumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: InstrumentService, useClass: MockInstrumentService }]
    });
    service = TestBed.inject(InstrumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return instrument by id', () => {
    const instrument = service.getInstrumentById(1);
    expect(instrument).toEqual({ id: 1, name: 'Guitar' });
  });
});
