import jwt from 'jsonwebtoken'
import { NextApiResponse } from 'next'
import { setCookie } from 'nookies'

export const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '7d' })
}

export const generateActivationToken = (payload: any) => {
  return jwt.sign(payload, `${process.env.ACTIVATION_TOKEN_SECRET}`, { expiresIn: '30m' })
}

export const generateRefreshToken = (payload: any, res: NextApiResponse) => {
  const rf_token = jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '30d' })

  setCookie({ res }, 'jobseek_rfToken', rf_token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/api/auth/refresh_token'
  })

  return rf_token
}