import { NextApiRequest, NextApiResponse } from 'next'
import { IDecodedToken } from './../utils/Interface'
import jwt from 'jsonwebtoken'
import User from './../models/User'

export const isAuthenticated = async(req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization
  if (!token)
    return res.status(401).json({ msg: 'Invalid authentication.' })

  const decoded = <IDecodedToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
  if (!decoded.id)
    return res.status(401).json({ msg: 'Invalid authentication.' })

  const user = await User.findById(decoded.id)
  if (!user)
    return res.status(401).json({ msg: 'Invalid authentication.' })

  return user
}