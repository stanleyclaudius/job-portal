import jwt from 'jsonwebtoken'
import connectDB from './../../../libs/db'
import User from './../../../models/User'
import { NextApiRequest, NextApiResponse } from 'next'
import { IDecodedToken } from './../../../utils/Interface'
import { generateAccessToken, generateRefreshToken } from './../../../utils/generateToken'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ msg: 'Endpoint method not allowed.' })

  const {jobseek_rfToken: token} = req.cookies
  if (!token)
    return res.status(401).json({ msg: 'Invalid authentication.' })

  const decoded = <IDecodedToken>jwt.verify(token, `${process.env.REFRESH_TOKEN_SECRET}`)
  if (!decoded.id)
    return res.status(401).json({ msg: 'Invalid authentication.' })

  const user = await User.findById(decoded.id)
  if (!user)
    return res.status(401).json({ msg: 'Invalid authentication.' })

  if (token !== user.rf_token)
    return res.status(401).json({ msg: 'Invalid authentication.' })
  
  const accessToken = generateAccessToken({ id: user._id })
  const refreshToken = generateRefreshToken({ id: user._id }, res)

  await User.findOneAndUpdate({ _id: user._id }, { rf_token: refreshToken })

  return res.status(200).json({
    accessToken,
    user: {
      ...user._doc,
      password: '',
      rf_token: ''
    }
  })
}

export default connectDB(handler)