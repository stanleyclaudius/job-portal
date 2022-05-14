import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../../../libs/db'
import { authorizeRoles, isAuthenticated } from '../../../../middlewares/auth'
import Job from '../../../../models/Job'
import JobsApplied from '../../../../models/JobsApplied'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PATCH')
    return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` })

  const user = await isAuthenticated(req, res)
  if (!user) return

  const isAuthorize = await authorizeRoles(user._id, res, 'organization')
  if (!isAuthorize) return

  const { job, status } = req.body
  
  const findJob = await Job.findOne({ _id: job, organization: isAuthorize._id })
  if (!findJob)
    return res.status(404).json({ msg: `Job not found within your organization.` })

  await JobsApplied.findOneAndUpdate({ jobseeker: req.query.id, job }, {
    status
  })

  return res.status(200).json({ msg: `Status has been changed to ${status}` })
}

export default connectDB(handler)