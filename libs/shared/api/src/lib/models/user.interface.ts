import { Id } from './id.type';

export enum Gender {
  male = 'Male',
  female = 'Female',
  other = 'Other'
}

export interface IUser {
  _id: Id;
  firstName: string;
  lastName: string;
  gender: Gender;
  email: string;
  password: string;
  phoneNumber: string;
}

export type ICreateUser = Pick<
  IUser,
  'firstName' | 'lastName' | 'email' | 'password' | 'phoneNumber' | 'gender'
>;
export type IUpdateUser = Partial<Omit<IUser, '_id'>>;
export type IUpsertUser = Pick<
  IUser,
  'firstName' | 'lastName' | 'email' | 'password' | 'phoneNumber' | 'gender'
>;
