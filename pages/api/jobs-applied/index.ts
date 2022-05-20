import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeRoles, isAuthenticated } from './../../../middlewares/auth'
import connectDB from './../../../libs/db'
import JobApplied from './../../../models/JobsApplied'
import Jobseeker from './../../../models/Jobseeker'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` })

  const user = await isAuthenticated(req, res)
  if (!user) return

  const isAuthorize = await authorizeRoles(user._id, res, 'jobseeker')
  if (!isAuthorize) return

  const findJobseeker = await Jobseeker.findOne({ user: user._id })

  const jobs = await JobApplied.aggregate([
    { $match: { jobseeker: findJobseeker._id } },
    {
      $lookup: {
        from: 'jobs',
        let: { job_id: '$job' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', '$$job_id'] } } },
          {
            $lookup: {
              from: 'organizations',
              let: { org_id: '$organization' },
              pipeline: [
                { $match: { $expr: { $eq: ['$_id', '$$org_id'] } } },
                {
                  $lookup: {
                    from: 'users',
                    let: { user_id: '$user' },
                    pipeline: [
                      { $match: { $expr: { $eq: ['$_id', '$$user_id'] } } },
                    ],
                    as: 'user'
                  }
                },
                { $unwind: '$user' }
              ],
              as: 'organization'
            }
          },
          { $unwind: '$organization' }
        ],
        as: 'job'
      }
    },
    { $unwind: '$job' }
  ])
  return res.status(200).json({ jobs })
}

export default connectDB(handler)