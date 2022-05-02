import connectDB from "../../../libs/db";
import User from './../../../models/User'
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from "next";
import { generateAccessToken, generateRefreshToken } from "../../../utils/generateToken";

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken, userID } = req.body

  const facebookEndpoint = `https://graph.facebook.com/v3.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`

  const data = await fetch(facebookEndpoint)
    .then(res => res.json())
    .then(res => { return res })

  const { email, name, picture } = data

  const password = email + 'L17esNls04pektn0WGaj8VLPH'
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
      type: 'facebook',
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