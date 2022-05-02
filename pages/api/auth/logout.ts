import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie } from "nookies";
import connectDB from "../../../libs/db";
import User from "../../../models/User";
import { IDecodedToken } from "../../../utils/Interface";
import jwt from 'jsonwebtoken'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization
  if (!token)
    return res.status(401).json({ msg: 'Invalid authentication.' })

  const decoded = <IDecodedToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
  if (!decoded.id)
    return res.status(401).json({ msg: 'Invalid authentication.' })

  const user = await User.findById(decoded.id)
  if (!user)
    return res.status(401).json({ msg: 'Invalid authentication.' })

  if (req.method !== 'POST')
    return res.status(405).json({ msg: 'Endpoint method not allowed.' })

  destroyCookie({ res }, 'jobseek_rfToken')

  await User.findOneAndUpdate({ _id: user._id }, { rf_token: '' })

  return res.status(200).json({ msg: 'Logout success.' })
}

export default connectDB(handler)