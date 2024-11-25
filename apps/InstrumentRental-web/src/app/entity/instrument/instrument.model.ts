export enum InstrumentType {
  guitar = 'guitar',
  keyboard = 'keyboard',
  blowingInstrument = 'flute',
  other = 'other',
}

export class Instrument {
  id: number = 0;
  name: string = '';
  type: InstrumentType = InstrumentType.other;
  brand: string = '';
  model: string = '';
  description: string = '';
  pricePerDay: number = 0;
  available: boolean = true;

  constructor(
    id: number = 0,
    name: string = '',
    type: InstrumentType = InstrumentType.other,
    brand: string = '',
    model: string = '',
    description: string = '',
    pricePerDay: number = 0,
    available: boolean = true
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.brand = brand;
    this.model = model;
    this.description = description;
    this.pricePerDay = pricePerDay;
    this.available = available;
  }
}
