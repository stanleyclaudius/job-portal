import { NextApiRequest, NextApiResponse } from 'next'
import { IDecodedToken } from './../../../utils/Interface'
import { generateAccessToken } from './../../../utils/generateToken'
import jwt from 'jsonwebtoken'
import User from './../../../models/User'
import connectDB from './../../../libs/db'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` })

  const { jobseek_rfToken: token } = req.cookies
  if (!token)
    return res.status(401).json({ msg: 'Invalid authentication.' })

  const decoded = <IDecodedToken>jwt.verify(token, `${process.env.REFRESH_TOKEN_SECRET}`)
  if (!decoded.id)
    return res.status(401).json({ msg: 'Invalid authentication.' })

  const user = await User.findById(decoded.id)
  const accessToken = generateAccessToken({ id: user._id })

  return {
    accessToken,
    user: {
      ...user._doc,
      password: ''
    }
  }
}

export default connectDB(handler)