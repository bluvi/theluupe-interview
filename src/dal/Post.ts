import { IUser } from './User';

export interface IPost {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  author: IUser;
}
