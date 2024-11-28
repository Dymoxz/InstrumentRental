import { Id } from './id.type';

export interface IReview {
  id: Id;
  content: string;
  rating: number;
  date: Date;
}

export type ICreateReview = Pick<IReview, 'content' | 'rating' | 'date'>;
export type IUpdateReview = Partial<Omit<IReview, 'id'>>;
export type IUpsertReview = Pick<IReview, 'content' | 'rating'>;
