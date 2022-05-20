import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeRoles, isAuthenticated } from './../../../middlewares/auth'
import connectDB from './../../../libs/db'
import Invitation from './../../../models/Invitation'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PATCH')
    return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` })
    
  const user = await isAuthenticated(req, res)
  if (!user) return

  const isAuthorize = await authorizeRoles(user._id, res, 'jobseeker')
  if (!isAuthorize) return

  const { status } = req.body
  if (!status)
    return res.status(400).json({ msg: 'Please provide new status for the invitation.' })

  const findInvitation = await Invitation.findOne({ _id: req.query.id }, { status: 'on review' })
  if (!findInvitation)
    return res.status(404).json({ msg: `Invitation not found.` })

  await Invitation.findOneAndUpdate({ _id: req.query.id }, { status })

  return res.status(200).json({ msg: `Invitation status has been ${status} successfully.` })
}

export default connectDB(handler)