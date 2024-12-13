import { Id } from './id.type';
import { IUser } from './user.interface';

export enum InstrumentType {
  string = 'String',
  keyboard = 'Keyboard',
  woodwind = 'Woodwind',
  brass = 'Brass',
  percussion = 'Percussion',
  electronic = 'Electronic',
  other = 'Other',
}

export interface IInstrument {
  _id: Id;
  name: string;
  type: InstrumentType | undefined;
  brand: string;
  model: string;
  description: string;
  pricePerDay: number;
  available: boolean;
  ownerEmail: string;
  owner?: IUser | null;
}

export type ICreateInstrument = Pick<
  IInstrument,
  'name' | 'description' | 'type' | 'brand' | 'model' | 'pricePerDay' | 'ownerEmail' // Add ownerEmail here
>;
export type IUpdateInstrument = Partial<Omit<IInstrument, '_id'>>;
export type IUpsertInstrument = Pick<
  IInstrument,
  'name' | 'description' | 'type' | 'brand' | 'model' | 'pricePerDay' | 'ownerEmail' // Add ownerEmail here
>;
