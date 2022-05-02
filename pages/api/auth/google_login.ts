import connectDB from "../../../libs/db";
import { OAuth2Client } from 'google-auth-library'
import { NextApiRequest, NextApiResponse } from "next";
import { IGooglePayload } from "../../../utils/Interface";
import bcrypt from 'bcrypt'
import User from './../../../models/User'
import { generateAccessToken, generateRefreshToken } from "../../../utils/generateToken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.body
  const verify = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  })

  const { email, email_verified, name, picture } = <IGooglePayload>verify.getPayload()
  if (!email_verified)
    return res.status(401).json({ msg: 'Email hasn\'t been verified yet.' })

  const password = email + 'yJD3WCk8EAVCUMJ8A77hDPd8B'
  const passwordHash = await bcrypt.hash(password, 12)

  const user = await User.findOne({ email })

  if (user) {
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
  } else {
    const user = {
      name,
      email,
      password: passwordHash,
      type: 'google',
      avatar: picture
    }

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
}

export default connectDB(handler)