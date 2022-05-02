import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../libs/db";
import { validateEmail } from "../../../utils/validator";
import bcrypt from 'bcrypt'
import { generateActivationToken } from "../../../utils/generateToken";
import sendEmail from "../../../utils/sendMail";

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ msg: 'Endpoint method not allowed.' })

  const { name, email, password } = req.body
  if (!name || !email || !password)
    return res.status(400).json({ msg: 'Please provide name, email, and password to register.' })

  if (!validateEmail(email))
    return res.status(400).json({ msg: 'Please provide valid email address.' })

  if (password.length < 8)
    return res.status(400).json({ msg: 'Password should be at least 8 characters.' })

  const passwordHash = await bcrypt.hash(password, 12)

  const user = { name, email, password: passwordHash }
  const token = generateActivationToken(user)
  const url = `${process.env.CLIENT_URL}/activate/${token}`
  await sendEmail(email, 'Account Activation', url)

  return res.status(200).json({ msg: `An account activation link has been sent to ${email}` })
}

export default connectDB(handler)