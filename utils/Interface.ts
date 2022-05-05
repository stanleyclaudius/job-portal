import { ChangeEvent, FormEvent } from 'react'

export type InputChange = ChangeEvent<HTMLInputElement>

export type FormSubmit = FormEvent<HTMLFormElement>

export interface ISocialMediaRegister extends IUserLogin {
  name: string
  avatar: string
  type: string
}

export interface IUser extends ISocialMediaRegister {
  _id: string
  role: string
  rf_token: string
  province: number
  city: number
  district: number
  postalCode: number
  _doc?: object
}

export interface IUserLogin {
  email: string
  password: string
}

export interface IActivationData {
  name: string
  email: string
  password: string
}

export interface IDecodedToken {
  id: string
}