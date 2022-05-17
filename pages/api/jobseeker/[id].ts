import { NextApiRequest, NextApiResponse } from 'next'
import { isAuthenticated } from './../../../middlewares/auth'
import connectDB from './../../../libs/db'
import Jobseeker from './../../../models/Jobseeker'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint` })

  const user = await isAuthenticated(req, res)
  if (!user) return

  const jobseeker = await Jobseeker.findOne({ user: req.query.id }).populate('user')
  if (!jobseeker)
    return res.status(404).json({ msg: `Jobseeker with user ID ${req.query.id} not found.` })

  return res.status(200).json({ jobseeker })
}

export default connectDB(handler)