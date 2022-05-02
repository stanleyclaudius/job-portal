import connectDB from './../../../libs/db'
import User from './../../../models/User'
import { NextApiRequest, NextApiResponse } from 'next'
import { validateEmail } from './../../../utils/validator'
import { loginUser } from './../../../utils/auth'

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

  loginUser(password, user, res)
}

export default connectDB(handler)