import connectDB from './../../../libs/db'
import User from './../../../models/User'
import { NextApiRequest, NextApiResponse } from 'next'
import { destroyCookie } from 'nookies'
import { isAuthenticated } from './../../../middlewares/auth'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  const user = isAuthenticated(req, res)

  if (req.method !== 'POST')
    return res.status(405).json({ msg: 'Endpoint method not allowed.' })

  destroyCookie({ res }, 'jobseek_rfToken', {
    path: '/api/auth/refresh_token'
  })

  // @ts-ignore
  await User.findOneAndUpdate({ _id: user._id }, { rf_token: '' })

  return res.status(200).json({ msg: 'Logout success.' })
}

export default connectDB(handler)