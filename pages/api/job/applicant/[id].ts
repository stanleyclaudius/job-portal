import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeRoles, isAuthenticated } from './../../../../middlewares/auth'
import mongoose from 'mongoose'
import connectDB from './../../../../libs/db'
import JobsApplied from './../../../../models/JobsApplied'
import Job from './../../../../models/Job'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` })

  const user = await isAuthenticated(req, res)
  if (!user) return

  const isAuthorize = await authorizeRoles(user._id, res, 'organization')
  if (!isAuthorize) return

  const findJob = await Job.findOne({ organization: isAuthorize._id, _id: req.query.id })
  if (!findJob)
    return res.status(404).json({ msg: `Job with ID ${req.query.id} not found within this organization` })

  const applicants = await JobsApplied.aggregate([
    { $match: { job: new mongoose.Types.ObjectId(`${req.query.id}`) } },
    {
      $lookup: {
        from: 'jobseekers',
        let: { jobseeker_id: '$jobseeker' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', '$$jobseeker_id'] } } },
          {
            $lookup: {
              from: 'users',
              let: { user_id: '$user' },
              pipeline: [
                { $match: { $expr: { $eq: ['$_id', '$$user_id'] } } },
                { $project: { name: 1, avatar: 1, createdAt: 1, province: 1 } }
              ],
              as: 'user'
            }
          },
          { $unwind: '$user' }
        ],
        as: 'jobseeker'
      }
    },
    { $unwind: '$jobseeker' }
  ])

  return res.status(200).json({ applicants })
}

export default connectDB(handler)