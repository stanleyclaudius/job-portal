import { ChangeEvent, FormEvent } from 'react'

export type InputChange = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

export type FormSubmit = FormEvent<HTMLFormElement>

export interface IJobseeker {
  _id: string
  cv?: string
  dob?: string
  user: IUser
  status: string
  skills: string[]
  about: string
}

export interface IEditProfile {
  avatar: string
  name: string
  dob: string
  cv: string
  province: string
  city: string
  district: string
  postalCode: number
  skills: string[]
  about: string
}

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
  createdAt?: string
}

export interface IUserLogin {
  email: string
  password: string
}

export interface IActivationData extends IUserLogin {
  name: string
}

export interface IDecodedToken {
  id: string
}

export interface IRegister extends IUserLogin {
  name: string
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

export interface IJob {
  _id?: string
  organization?: IOrganization
  position: string
  employmentType: string
  jobLevel: string
  skills: string[]
  salary: number
  overview: string
  requirements: string
  keywords: string[]
  createdAt?: string
  category?: string
}

export interface IJobState {
  data: IJob[]
  totalPage: number
}

export interface IInvitation {
  _id?: string
  job: IJob
  user: IUser
  status?: string
}

export interface ICategory {
  _id?: string
  name: string
  image: string | File[]
}

export interface ICategoryState {
  data: ICategory[]
  totalPage: number
}

export interface IOrganization {
  _id: string
  user: IUser
  phoneNumber: string
  createdDate: string
  totalEmployee: number
  industryType: string
  address: string
  description: string
  status: string
  createdAt: string
}

export interface IOrganizationState {
  data: IOrganization[]
  totalPage: number
}

export interface IApplicant {
  _id: string
  status: string
  job: string
  jobseeker: IJobseeker
}

export interface IAlert {
  error?: string
  success?: string
  loading?: boolean
}

export interface IAuth {
  accessToken?: string
  user?: IUser
}