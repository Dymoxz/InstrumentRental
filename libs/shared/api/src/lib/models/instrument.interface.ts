import { Id } from './id.type';

export enum InstrumentType {
  guitar = 'guitar',
  keyboard = 'keyboard',
  blowingInstrument = 'flute',
  other = 'other',
}

// Voor nu is onze user een string; later zullen we hier een User object van maken.
type User = string;

export interface IInstrument {
  id: Id,
  name: string,
  type: InstrumentType,
  brand: string,
  model: string,
  description: string,
  pricePerDay: number,
  available: boolean
}

export type ICreateInstrument = Pick<
    IInstrument,
    'name' | 'description' | 'type' | 'brand' | 'model' | 'pricePerDay'
>;
export type IUpdateInstrument = Partial<Omit<IInstrument, 'id'>>;
export type IUpsertInstrument =  Pick<
  IInstrument,
  'name' | 'description' | 'type' | 'brand' | 'model' | 'pricePerDay'
>;;