import { NextApiRequest, NextApiResponse } from 'next'
import { validateEmail } from './../../../utils/validator'
import { generateActivationToken } from './../../../utils/generateToken'
import { authMsg } from './../../../utils/mailMsg'
import bcrypt from 'bcrypt'
import User from './../../../models/User'
import sendEmail from './../../../utils/sendMail'
import connectDB from './../../../libs/db'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ msg: `${req.method} method not allowed for this endpoint.` })

  const {
    name,
    email,
    password,
    avatar,
    province,
    city,
    district,
    postalCode,
    role,
    phoneNumber,
    createdDate,
    totalEmployee,
    industryType,
    address,
    description
  } = req.body
  
  if (role === 'jobseeker') {
    if (!name || !email || !password)
      return res.status(400).json({ msg: 'Please provide name, email, and password for register.' })

    if (!validateEmail(email))
      return res.status(400).json({ msg: 'Please provid valid email address.' })

    if (password.length < 8)
      return res.status(400).json({ msg: 'Password should be at least 8 characters.' })

    const findUser = await User.findOne({ email })
    if (findUser)
      return res.status(400).json({ msg: `${email} email has been registered before.` })

    const passwordHash = await bcrypt.hash(password, 12)

    const user = {
      name,
      email,
      password: passwordHash,
      role: 'jobseeker'
    }

    const token = generateActivationToken(user)
    const url = `${process.env.CLIENT_URL}/activate/${token}`

    sendEmail(email, 'Account Activation', url)

    return res.status(200).json({ msg: `An account activation link has been sent to ${email}` })
  } else if (role === 'organization') {
    if (
      !name ||
      !email ||
      !password ||
      !avatar ||
      !province ||
      !city ||
      !district ||
      !postalCode ||
      !phoneNumber ||
      !createdDate ||
      !industryType ||
      !address ||
      !description
    )
      return res.status(400).json({ msg: 'Please provide every field in form to register.' })

    if (!validateEmail(email))
      return res.status(400).json({ msg: 'Please provide valid email address.' })

    if (password.length < 8)
      return res.status(400).json({ msg: 'Password should be at least 8 characters.' })

    if (phoneNumber.length < 8)
      return res.status(400).json({ msg: 'Please provide valid phone number' })

    if (new Date(createdDate).toISOString() > new Date().toISOString())
      return res.status(400).json({ msg: 'Organization created date can\'t be greater than current date.' })

    if (totalEmployee < 1)
      return res.status(400).json({ msg: 'Organization estimated total employee should be more than 0.' })

    if (description.length < 100)
      return res.status(400).json({ msg: 'Organization description should be at least 100 characters.' })

    const findUser = await User.findOne({ email })
    if (findUser)
      return res.status(400).json({ msg: `Email ${email} has been registered before.` })

    const passwordHash = await bcrypt.hash(password, 12)

    const user = {
      name,
      email,
      password: passwordHash,
      avatar,
      province,
      city,
      district,
      postalCode,
      phoneNumber,
      createdDate,
      totalEmployee,
      industryType,
      address,
      description,
      role: 'organization'
    }

    const token = generateActivationToken(user)

    const url = `${process.env.CLIENT_URL}/activate/${token}`

    const emailMsg = authMsg('Account Activation', url)

    sendEmail(email, 'Account Activation', emailMsg)

    return res.status(200).json({ msg: `An account activation link has been sent to ${email}` })
  } else {
    return res.status(400).json({ msg: `${role} role is not exists.` })
  }
}

export default connectDB(handler)