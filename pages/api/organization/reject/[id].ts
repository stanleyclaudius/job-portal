import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeRoles, isAuthenticated } from './../../../../middlewares/auth'
import { orgStatusMsg } from './../../../../utils/mailMsg'
import Organization from './../../../../models/Organization'
import User from './../../../../models/User'
import sendEmail from './../../../../utils/sendMail'
import connectDB from './../../../../libs/db'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE')
    return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` })
    
  const user = await isAuthenticated(req, res)
  if (!user) return

  const isAuthorize = await authorizeRoles(user._id, res, 'admin')
  if (!isAuthorize) return

  const organization = await Organization.findById(req.query.id)
  if (!organization)
    return res.status(404).json({ msg: `Organization with ID ${req.query.id} not found.` })

  const userId = organization.user
  const findUser = await User.findById(userId)
  if (!findUser)
    return res.status(404).json({ msg: `User with ID ${userId} not found.` })

  await Organization.findByIdAndDelete(req.query.id)
  await User.findByIdAndDelete(userId)

  const emailMsg = orgStatusMsg('reject')
  sendEmail(findUser.email, 'Organization Approval Status', emailMsg)

  return res.status(200).json({ msg: `Organization with ID ${req.query.id} has been rejected successfully.` })
}

export default connectDB(handler)