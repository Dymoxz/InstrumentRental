import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { InstrumentComponent } from './instrument.component';
import { InstrumentService } from './instrument.service';
import { Instrument } from './instrument.model';

class MockInstrumentService {
  getInstrumentById(id: number): Instrument {
    return { id, name: 'Guitar' } as Instrument;
  }
}

describe('InstrumentComponent', () => {
  let component: InstrumentComponent;
  let fixture: ComponentFixture<InstrumentComponent>;
  let mockInstrumentService: MockInstrumentService;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockInstrumentService = new MockInstrumentService();
    mockActivatedRoute = {
      paramMap: {
        subscribe: (fn: (value: any) => void) => fn({
          get: (key: string) => '1'
        })
      }
    };

    await TestBed.configureTestingModule({
      imports: [InstrumentComponent],
      providers: [
        { provide: InstrumentService, useValue: mockInstrumentService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set instrumentId and instrument on init', () => {
    component.ngOnInit();

    expect(component.instrumentId).toBe('1');
    expect(component.instrument).toEqual({ id: 1, name: 'Guitar' });
  });
});
