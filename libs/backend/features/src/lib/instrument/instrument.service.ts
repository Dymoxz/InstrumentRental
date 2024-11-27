import { Injectable, NotFoundException } from '@nestjs/common';
import { IInstrument, InstrumentType } from '@InstrumentRental/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class InstrumentService {
  TAG = 'InstrumentService';

  private instruments$ = new BehaviorSubject<IInstrument[]>([
    {
      id: '0',
      name: 'Spaghetti con funghi',
      description: 'Vega version of the famous spaghetti recipe.',
      type: InstrumentType.other,
      brand: 'Gibson',
      model: 'Les Paul',
      pricePerDay: 12,
      available: true
    },
  ]);

  getAll(): IInstrument[] {
    Logger.log('getAll', this.TAG);
    return this.instruments$.value;
  }

  getOne(id: string): IInstrument {
    Logger.log(`getOne(${id})`, this.TAG);
    const instrument = this.instruments$.value.find((td) => td.id === id);
    if (!instrument) {
      throw new NotFoundException(`Instrument could not be found!`);
    }
    return instrument;
  }

  /**
   * Update the arg signature to match the DTO, but keep the
   * return signature - we still want to respond with the complete
   * object
   */
  create(instrument: Pick<IInstrument,  'name' | 'description' | 'type' | 'brand' | 'model' | 'pricePerDay'>): IInstrument {
    Logger.log('create', this.TAG);
    const current = this.instruments$.value;
    // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
    const newInstrument: IInstrument = {
      ...instrument,
      id: `instrument-${Math.floor(Math.random() * 10000)}`,
      available: true
    };
    this.instruments$.next([...current, newInstrument]);
    return newInstrument;
  }
}
