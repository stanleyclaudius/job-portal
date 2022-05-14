import { ChangeEvent, FormEvent } from 'react'
import RootReducer from './../redux/reducers'

export type InputChange = ChangeEvent<HTMLInputElement | HTMLSelectElement>

export type FormSubmit = FormEvent<HTMLFormElement>

export type RootStore = ReturnType<typeof RootReducer>

export interface IUser extends IUserLogin {
  _id: string
  name: string
  avatar: string
  type: string
  role: string
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

export interface IRegister {
  name: string
  email: string
  password: string
  role: string
  avatar?: string
  province?: string
  city?: string
  district?: string
  postalCode?: number
  address?: string
  description?: string
  createdDate?: string
  totalEmployee?: number
  industryType?: string
  phoneNumber?: string
}

export interface IProvinceData {
  id: number
  nama: string
}

export interface ICityData extends IProvinceData {
  id_provinsi: string
}

export interface IDistrictData extends IProvinceData {
  id_kota: string
}