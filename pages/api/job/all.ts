import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from './../../../libs/db'
import Job from './../../../models/Job'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` })

  const searchQuery = req.query.q
  const jobLevelQuery = []
  const employmentTypeQuery = []
  
  const jobAggregate: any[] = [
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
    { $unwind: '$organization' },
    { $sort: { createdAt: -1 } }
  ]

  if (req.query.jobLevel) {
    if (typeof req.query.jobLevel === 'string') {
      jobLevelQuery.push(req.query.jobLevel)
    } else {
      for (let i = 0; i < `${req.query.jobLevel}`.length; i++) {
        jobLevelQuery.push((req.query.jobLevel as string[])[i])
      }
    }
  }

  if (req.query.employmentType) {
    if (typeof req.query.employmentType === 'string') {
      employmentTypeQuery.push(req.query.employmentType)
    } else {
      for (let i = 0; i < `${req.query.employmenType}`.length; i++) {
        employmentTypeQuery.push((req.query.employmentType as string[])[i])
      }
    }
  }

  if (jobLevelQuery.length !== 0) {
    jobAggregate.unshift({
      $match: { jobLevel: { $in: jobLevelQuery } }
    })
  }

  if (employmentTypeQuery.length !== 0) {
    jobAggregate.unshift({
      $match: { employmentType: { $in: employmentTypeQuery } }
    })
  }

  if (req.query.salary) {
    jobAggregate.unshift({
      $match: { salary: { $gte: parseInt(`${req.query.salary}`) } }
    })
  }

  if (searchQuery) {
    const searchAggregate = {
      $search: {
        index: 'job',
        text: {
          path: ['position', 'skills', 'keywords'],
          query: searchQuery
        }
      }
    }

    jobAggregate.unshift(searchAggregate)
  }

  const jobs = await Job.aggregate(jobAggregate)
  return res.status(200).json({ jobs })
}

export default connectDB(handler)