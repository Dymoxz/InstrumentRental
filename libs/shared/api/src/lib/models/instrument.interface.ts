import { Id } from './id.type';

export enum InstrumentType {
  string = 'String',
  keyboard = 'Keyboard',
  woodwind = 'Woodwind',
  brass = 'Brass',
  percussion = 'Percussion',
  electronic = 'Electronic ',
  other = 'Other',
}

export interface IInstrument {
  id: Id;
  name: string;
  type: InstrumentType | undefined;
  brand: string;
  model: string;
  description: string;
  pricePerDay: number;
  available: boolean;
}

export type ICreateInstrument = Pick<
  IInstrument,
  'name' | 'description' | 'type' | 'brand' | 'model' | 'pricePerDay'
>;
export type IUpdateInstrument = Partial<Omit<IInstrument, 'id'>>;
export type IUpsertInstrument = Pick<
  IInstrument,
  'name' | 'description' | 'type' | 'brand' | 'model' | 'pricePerDay'
>;
