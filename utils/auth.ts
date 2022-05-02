import bcrypt from 'bcrypt'
import User from './../models/User'
import { NextApiResponse } from 'next'
import { generateAccessToken, generateRefreshToken } from './generateToken'
import { ISocialMediaRegister, IUser } from './Interface'

export const loginUser = async(password: string, user: IUser, res: NextApiResponse) => {
  const isPwMatch = await bcrypt.compare(password, user.password)
  if (!isPwMatch) {
    const msg = user.type === 'register' ? 'Invalid credential' : `This account uses ${user.type} login feature.`
    return res.status(401).json({ msg })
  }

  const accessToken = generateAccessToken({ id: user._id })
  const refreshToken = generateRefreshToken({ id: user._id }, res)

  await User.findOneAndUpdate({ _id: user._id }, { rf_token: refreshToken })

  return res.status(200).json({
    msg: `Authenticated as ${user.name}`,
    accessToken,
    user: {
      ...user._doc,
      password: '',
      rf_token: ''
    }
  })
}

export const registerUser = async(user: ISocialMediaRegister, res: NextApiResponse) => {
  const newUser = new User(user)

  const accessToken = generateAccessToken({ id: newUser._id })
  const refreshToken = generateRefreshToken({ id: newUser._id }, res)

  newUser.rf_token = refreshToken
  await newUser.save()

  return res.status(200).json({
    msg: `Authenticated as ${user.name}`,
    accessToken,
    user: {
      ...newUser._doc,
      password: '',
      rf_tkoen: ''
    }
  })
}