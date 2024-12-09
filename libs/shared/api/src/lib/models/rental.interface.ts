import { Id } from './id.type';
import { IInstrument } from './instrument.interface';

export enum RentalStatus {
  pendingApproval = 'Pending Approval',
  inProgress = 'In Progress',
  completed = 'Completed'

}

export interface IRental {
  _id: Id;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  reason: string;
  status: RentalStatus.pendingApproval;

  instrumentId: Id;
  instrumentOwnerEmail: string;
  renterEmail: string;
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
