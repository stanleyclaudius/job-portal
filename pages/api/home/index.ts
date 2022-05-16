import { NextApiRequest, NextApiResponse } from 'next'
import Job from '../../../models/Job'
import connectDB from './../../../libs/db'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` })

  const latestJob = await Job.aggregate([
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
                { $match: { $expr: { $eq: ['$_id', '$$user_id'] } } }
              ],
              as: 'user'
            }
          },
          { $unwind: '$user' }
        ],
        as: 'organization'
      }
    },
    { $unwind: '$organization' },
    { $sort: { createdAt: -1 } },
    { $limit: 8 }
  ])

  return res.status(200).json({ latestJob })
}

export default connectDB(handler)