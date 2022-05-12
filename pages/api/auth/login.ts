import { NextApiRequest, NextApiResponse } from 'next'
import { validateEmail } from './../../../utils/validator'
import { generateAccessToken, generateRefreshToken } from './../../../utils/generateToken'
import bcrypt from 'bcrypt'
import User from './../../../models/User'
import connectDB from './../../../libs/db'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ msg: `${req.method} method not allowed for this endpoint.` })

  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ msg: 'Please provide email and password to login.' })

  if (!validateEmail(email))
    return res.status(400).json({ msg: 'Please provide valid email address.' })

  const user = await User.findOne({ email })
  if (!user)
    return res.status(401).json({ msg: 'Invalid credential.' })
    
  const isPassMatch = await bcrypt.compare(password, user.password)
  if (!isPassMatch)
    return res.status(401).json({ msg: 'Invalid credential.' })

  const accessToken = generateAccessToken({ id: user._id })
  const refreshToken = generateRefreshToken({ id: user._id })

  return res.status(200).json({ 
    msg: `Authorized as ${user.name}`,
    accessToken,
    refreshToken,
    user: {
      ...user._doc,
      password: ''
    }
  })
}

export default connectDB(handler)