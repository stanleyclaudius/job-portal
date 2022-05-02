import bcrypt from 'bcrypt'
import connectDB from './../../../libs/db'
import User from './../../../models/User'
import { NextApiRequest, NextApiResponse } from 'next'
import { loginUser, registerUser } from './../../../utils/auth'

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
    loginUser(password, user, res)
  } else {
    const user = {
      name,
      email,
      password: passwordHash,
      type: 'facebook',
      avatar: picture
    }

    registerUser(user, res)
  }
}

export default connectDB(handler)