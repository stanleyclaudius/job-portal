import { NextApiRequest, NextApiResponse } from 'next'
import { generateAccessToken } from './../../../utils/generateToken'
import { authMsg } from './../../../utils/mailMsg'
import { validateEmail } from './../../../utils/validator'
import connectDB from './../../../libs/db'
import User from './../../../models/User'
import sendEmail from './../../../utils/sendMail'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` })

  const { email } = req.body
  if (!email)
    return res.status(400).json({ msg: 'Please provide email address.' })

  if (!validateEmail(email))
    return res.status(400).json({ msg: 'Please provide valid email address.' })

  const findUser = await User.findOne({ email })
  if (!findUser)
    return res.status(404).json({ msg: 'Email not found.' })

  const token = generateAccessToken({ email })
  const url = `${process.env.CLIENT_URL}/reset/${token}`
  const emailMsg = authMsg('Reset Password', url)

  sendEmail(email, 'Reset Password', emailMsg)

  return res.status(200).json({ msg: 'Reset password link has been sent to your email.' })
}

export default connectDB(handler)