import { Id } from './id.type';
import { IUser } from './user.interface';

export interface IReview {
  _id: Id;
  content: string;
  rating: number;
  date: Date;

  reviewerEmail: string;
  reviewer?: IUser | null;
  revieweeEmail: string;
}

export type ICreateReview = Pick<IReview, 'content' | 'rating' | 'date' | 'reviewerEmail' | 'revieweeEmail'>;
export type IUpdateReview = Partial<Omit<IReview, '_id'>>;
