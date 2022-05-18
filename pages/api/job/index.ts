import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeRoles, isAuthenticated } from './../../../middlewares/auth'
import Job from './../../../models/Job'
import connectDB from './../../../libs/db'

const Pagination = (req: NextApiRequest) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 6
  const skip = (page - 1) * limit
  return { page, skip, limit }
}

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  const user = await isAuthenticated(req, res)
  if (!user) return

  const isAuthorize = await authorizeRoles(user._id, res, 'organization')
  if (!isAuthorize) return

  switch (req.method) {
    case 'POST':
      if (isAuthorize.status === 'accepted') {
        const { position, employmentType, jobLevel, category, skills, salary, overview, requirements, keywords } = req.body

        if (!position || !employmentType || !category || !jobLevel || skills.length < 1 || salary < 1 || !overview ||!requirements || keywords.length < 1)
          return res.status(400).json({ msg: 'Please provide every field in form to create job.' })

        if (overview.length < 100)
          return res.status(400).json({ msg: 'Job overview should be at least 100 characters.' })
          
        const newJob = new Job({
          organization: isAuthorize._id,
          position,
          jobLevel,
          employmentType,
          category,
          skills,
          salary,
          overview,
          requirements,
          keywords
        })
        await newJob.save()

        return res.status(200).json({
          msg: 'Job has been created successfully.',
          job: newJob
        })
      } else {
        return res.status(401).json({ msg: 'Your organization haven\'t been accepted yet by admin.' })
      }
    case 'GET':
      const { skip, limit } = Pagination(req)

      const data = await Job.aggregate([
        {
          $facet: {
            totalData: [
              { $match: { organization: isAuthorize._id } },
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
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              { $limit: limit }
            ],
            totalCount: [
              { $match: { organization: isAuthorize._id } },
              { $count: 'count' }
            ]
          }
        },
        {
          $project: {
            totalData: 1,
            count: { $arrayElemAt: ['$totalCount.count', 0] }
          }
        }
      ])

      const jobs = data[0].totalData
      const jobsCount = data[0].count
      let totalPage = 0

      if (jobs.length === 0) totalPage = 0
      else {
        if (jobsCount % limit === 0) {
          totalPage = jobsCount / limit
        } else {
          totalPage = Math.floor(jobsCount / limit) + 1
        }
      }

      return res.status(200).json({ jobs, totalPage })
    default:
      return res.status(405).json({ msg: `${req.method} method not allowed for this endpoint.` })
  }
}

export default connectDB(handler)