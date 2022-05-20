import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeRoles, isAuthenticated } from './../../../../middlewares/auth'
import connectDB from './../../../../libs/db'
import Job from './../../../../models/Job'
import JobsApplied from './../../../../models/JobsApplied'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  const user = await isAuthenticated(req, res)
  if (!user) return

  let isAuthorize

  switch (req.method) {
    case 'PATCH':
      isAuthorize = await authorizeRoles(user._id, res, 'organization')
      if (!isAuthorize) return

      const { job, status } = req.body
      
      const findJob = await Job.findOne({ _id: job, organization: isAuthorize._id })
      if (!findJob)
        return res.status(404).json({ msg: `Job not found within your organization.` })

      await JobsApplied.findOneAndUpdate({ jobseeker: req.query.id, job }, {
        status
      })

      return res.status(200).json({ msg: `Status has been changed to ${status}` })
    case 'GET':
      isAuthorize = await authorizeRoles(user._id, res, 'jobseeker')
      if (!isAuthorize) return
      
      const isApplied = await JobsApplied.findOne({ jobseeker: isAuthorize._id, job: req.query.id })
      
      return res.status(200).json({ isApplied: isApplied ? true : false })
    default:
      return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` })
  }
}

export default connectDB(handler)