import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../libs/db";
import Job from "../../../models/Job";
import mongoose from 'mongoose'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` })

  const jobId = req.query.id

  const job = await Job.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(jobId as string) } },
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
                { $project: { name: 1, avatar: 1, province: 1, city: 1, district: 1, postalCode: 1 } }
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
  ])

  if (job.length === 0)
    return res.status(404).json({ msg: `Job with ID ${jobId} not found.` })

  return res.status(200).json({ job })
}

export default connectDB(handler)