import { Id } from './id.type';
import { IInstrument } from './instrument.interface';
import { IUser } from './user.interface';

export enum RentalStatus {
  pendingApproval = 'Pending Approval',
  inProgress = 'In Progress',
  completed = 'Completed',
  rejected = 'Rejected'

}

export interface IRental {
  _id: Id;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  reason: string;
  status: RentalStatus;

  instrumentId: Id;
  instrument?: IInstrument | null;
  instrumentOwnerEmail: string;
  instrumentOwner?: IUser | null;
  renterEmail: string;
  renter?: IUser | null;
}

export type ICreateRental = Pick<
  IRental,
  'startDate' | 'endDate' | 'totalPrice' | 'reason' | 'status' | 'instrumentId' | 'instrumentOwnerEmail' | 'renterEmail'
>;
export type IUpdateRental = Partial<Omit<IRental, '_id'>>;
export type IUpsertRental = Pick<
  IRental,
  'startDate' | 'endDate' | 'totalPrice' | 'reason' | 'status' | 'instrumentId' | 'instrumentOwnerEmail' | 'renterEmail'
>;
