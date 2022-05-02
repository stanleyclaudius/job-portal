import { NextApiRequest } from "next"

export interface IUser {
  _id: string
  name: string
  email: string
  password: string
  avatar: string
  role: string
  type: string
  rf_token: string
  province: number
  city: number
  district: number
  postalCode: number
}

export interface IActivationData {
  name: string
  email: string
  password: string
}

export interface IDecodedToken {
  id: string
}

export interface IGooglePayload {
  email: string
  email_verified: boolean
  name: string
  picture: string
}