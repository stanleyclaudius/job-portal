import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../libs/db";
import User from "../../../models/User";
import bcrypt from 'bcrypt'
import { validateEmail } from "../../../utils/validator";
import { generateAccessToken, generateRefreshToken } from "../../../utils/generateToken";

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ msg: 'Endpoint method not allowed.' })

  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ msg: 'Please provide email and password to login.' })

  if (!validateEmail(email))
    return res.status(400).json({ msg: 'Please provide valid email address.' })

  const user = await User.findOne({ email })
  if (!user)
    return res.status(401).json({ msg: 'Invalid credential.' })

  const isPwMatch = await bcrypt.compare(password, user.password)
  if (!isPwMatch) {
    const msg = user.type === 'register' ? 'Invalid credential.' : `This account uses ${user.type} login feature.`
    return res.status(400).json({ msg })
  }

  const accessToken = generateAccessToken({ id: user._id })
  const refreshToken = generateRefreshToken({ id: user._id }, res)

  await User.findOneAndUpdate({ _id: user._id }, {
    rf_token: refreshToken
  })

  return res.status(200).json({
    msg:  `Authenticated as ${user.name}`,
    accessToken,
    user: {
      ...user._doc,
      password: '',
      rf_token: ''
    }
  })
}

export default connectDB(handler)