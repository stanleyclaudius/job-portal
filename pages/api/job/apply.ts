import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeRoles, isAuthenticated } from './../../../middlewares/auth'
import connectDB from './../../../libs/db'
import Job from './../../../models/Job'
import Jobseeker from './../../../models/Jobseeker'
import JobsApplied from './../../../models/JobsApplied'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` })

  const user = await isAuthenticated(req, res)
  if (!user) return

  const isAuthorize = await authorizeRoles(user._id, res, 'jobseeker')
  if (!isAuthorize) return

  const { job, userId } = req.body
  if (!job || !userId)
    return res.status(400).json({ msg: 'Please specify job and user data.' })

  const findJob = await Job.findById(job)
  if (!findJob)
    return res.status(404).json({ msg: `Job with ID ${job} not found.` })

  const findJobseeker = await Jobseeker.findOne({ user: userId })
  if (!findJobseeker)
    return res.status(404).json({ msg: `Jobseeker with user ID ${userId} not found.` })

  const isAppliedBefore = await JobsApplied.findOne({ job, user: userId, status: { $ne: 'rejected' } })
  if (isAppliedBefore)
    return res.status(400).json({ msg: 'Job has been applied before.' })

  const newJobsApplied = new JobsApplied({
    job,
    jobseeker: findJobseeker._id
  })
  await newJobsApplied.save()

  return res.status(200).json({ msg: 'Job applied successfully.' })
}

export default connectDB(handler)