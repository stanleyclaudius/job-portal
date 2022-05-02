import bcrypt from 'bcrypt'
import connectDB from './../../../libs/db'
import User from './../../../models/User'
import { OAuth2Client } from 'google-auth-library'
import { NextApiRequest, NextApiResponse } from 'next'
import { IGooglePayload } from './../../../utils/Interface'
import { loginUser, registerUser } from './../../../utils/auth'

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
    loginUser(password, user, res)
  } else {
    const user = {
      name,
      email,
      password: passwordHash,
      type: 'google',
      avatar: picture
    }

    registerUser(user, res)
  }
}

export default connectDB(handler)