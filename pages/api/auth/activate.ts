import { NextApiRequest, NextApiResponse } from 'next'
import { IRegister } from './../../../utils/Interface'
import jwt from 'jsonwebtoken'
import connectDB from './../../../libs/db'
import User from './../../../models/User'
import Jobseeker from './../../../models/Jobseeker'
import Organization from './../../../models/Organization'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ msg: `${req.method} method not allowed for this endpoint.` })

  const { token } = req.body
  if (!token)
    return res.status(400).json({ msg: 'Please provide account activation token.' })

  const decoded = <IRegister>jwt.verify(token, `${process.env.ACTIVATION_TOKEN_SECRET}`)
  if (!decoded)
    return res.status(401).json({ msg: 'Invalid account activation token.' })

  const findUser = await User.findOne({ email: decoded.email })
  if (findUser)
    return res.status(400).json({ msg: 'Email has been registered before.' })

  const newUser = new User({
    name: decoded.name,
    email: decoded.email,
    password: decoded.password,
    role: decoded.role,
    avatar: decoded.avatar || 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
    province: decoded.province || '',
    city: decoded.city || '',
    district: decoded.district || '',
    postalCode: decoded.postalCode || ''
  })

  await newUser.save()

  if (decoded.role === 'jobseeker') {
    const newJobseeker = new Jobseeker({
      user: newUser._id
    })

    await newJobseeker.save()
  } else {
    const newOrganization = new Organization({
      user: newUser._id,
      phoneNumber: decoded.phoneNumber,
      createdDate: decoded.createdDate,
      totalEmployee: decoded.totalEmployee,
      industryType: decoded.industryType,
      address: decoded.address,
      description: decoded.description
    })

    await newOrganization.save()
  }

  let msg = 'Account has been activated successfully.'

  if (decoded.role === 'organization')
    msg += ' Please wait for account to be verified by admin as an organization account.'

  return res.status(200).json({ msg })
}

export default connectDB(handler)