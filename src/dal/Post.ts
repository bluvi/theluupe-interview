import { IUser } from './User';

export interface IPost {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  text: string;
  author: IUser;
}
