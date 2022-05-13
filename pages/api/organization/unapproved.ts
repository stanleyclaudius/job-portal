import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../../libs/db'
import { authorizeRoles, isAuthenticated } from '../../../middlewares/auth'
import Organization from '../../../models/Organization'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
      return res.status(405).json({ msg: `${req.method} method not allowed for this endpoint.` })

  const user = await isAuthenticated(req, res)

  if (user) {
    const isAuthorize = await authorizeRoles(user._id, res, 'admin')
    if (isAuthorize) {
      const unapprovedOrganization = await Organization.find({ status: { $ne: 'accepted' } }).populate('user')
  
      return res.status(200).json({ organizations: unapprovedOrganization })
    }
  }
}

export default connectDB(handler)