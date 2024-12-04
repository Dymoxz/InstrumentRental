import { Id } from './id.type';
import { IUserRegistration } from './auth.interface';
import { IInstrument } from './instrument.interface';

export enum Gender {
  male = 'Male',
  female = 'Female',
  other = 'Other'
}
export interface Address {
  streetName: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country: string;
}


export interface IUserIdentity {
  _id: Id;
  firstName: string;
  lastName: string;
  email: string;
  token?: string;
}

export interface IUserInfo extends IUserRegistration {
  _id: Id;
  gender: Gender;
  phoneNumber: string;
  bio: string;
  address: Address;
}

export interface IUser extends IUserInfo {
  instruments: IInstrument[]
}

export type ICreateUser = Pick<IUser,  'password' | 'email'>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;
