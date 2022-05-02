import jwt from 'jsonwebtoken'
import connectDB from './../../../libs/db'
import User from './../../../models/User'
import { NextApiRequest, NextApiResponse } from 'next'
import { IActivationData } from './../../../utils/Interface'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ msg: 'Endpoint method not allowed.' })

  const { token } = req.body
  if (!token)
    return res.status(400).json({ msg: 'Please provide account activation token.' })

  const userData = <IActivationData>jwt.verify(token, `${process.env.ACTIVATION_TOKEN_SECRET}`)
  if (!userData)
    return res.status(400).json({ msg: 'Invalid activation token.' })

  const findUser = await User.findOne({ email: userData.email })
  if (findUser)
    return res.status(400).json({ msg: 'Email has been used before.' })
  
  const newUser = new User(userData)
  await newUser.save()

  return res.status(200).json({
    msg: 'Account has been activated successfully.',
    user: {
      ...newUser._doc,
      password: ''
    }
  })
}

export default connectDB(handler)