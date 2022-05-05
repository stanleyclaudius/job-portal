import jwt from 'jsonwebtoken'
import { NextApiResponse } from 'next'

export const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '7d' })
}

export const generateActivationToken = (payload: any) => {
  return jwt.sign(payload, `${process.env.ACTIVATION_TOKEN_SECRET}`, { expiresIn: '30m' })
}

export const generateRefreshToken = (payload: any, res: NextApiResponse) => {
  return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '30d' })
}