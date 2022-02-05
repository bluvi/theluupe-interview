import { IUser } from './User';

export interface IUserTokenResponse {
  user: IUser;
  accessToken: string;
}
