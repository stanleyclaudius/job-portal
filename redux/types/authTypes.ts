import { IUser } from './../../utils/Interface'

export const AUTH = 'AUTH'

export interface IAuthType {
  accessToken?: string
  user?: IUser
}

export interface IAuthAction {
  type: typeof AUTH
  payload: IAuthType
}