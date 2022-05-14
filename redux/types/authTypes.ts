import { IUser } from './../../utils/Interface'

export const AUTH = 'AUTH'

export interface IAuth {
  accessToken?: string
  user?: IUser
}

export interface IAuthAction {
  type: typeof AUTH
  payload: IAuth
}