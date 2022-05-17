import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeRoles, isAuthenticated } from './../../../../middlewares/auth'
import connectDB from './../../../../libs/db'
import Jobseeker from './../../../../models/Jobseeker'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` })
  
  const user = await isAuthenticated(req, res)
  if (!user) return

  const isAuthorize = await authorizeRoles(user._id, res, 'organization', 'admin')
  if (!isAuthorize) return

  const jobseeker = await Jobseeker.findOne({ _id: req.query.id }).populate('user', 'name')
  if (!jobseeker)
    return res.status(404).json({ msg: 'Jobseeker not found.' })

  return res.status(200).json({ jobseeker })
}

export default connectDB(handler)