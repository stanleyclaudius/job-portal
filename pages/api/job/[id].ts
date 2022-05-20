import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeRoles, isAuthenticated } from './../../../middlewares/auth'
import mongoose from 'mongoose'
import connectDB from './../../../libs/db'
import Job from './../../../models/Job'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  const jobId = req.query.id
  let user
  let isAuthorize

  switch (req.method) {
    case 'GET':
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
    case 'DELETE':
      user = await isAuthenticated(req, res)
      if (!user) return

      isAuthorize = await authorizeRoles(user._id, res, 'organization')
      if (!isAuthorize) return

      const deletedJob = await Job.findOneAndDelete({ _id: jobId })
      if (!deletedJob)
        return res.status(404).json({ msg: `Job with ID ${jobId} not found.` })
      
      return res.status(200).json({ msg: 'Job has been deleted successfully.' })
    case 'PATCH':
      user = await isAuthenticated(req, res)
      if (!user) return

      isAuthorize = await authorizeRoles(user._id, res, 'organization')
      if (!isAuthorize) return
      
      const { position, employmentType, jobLevel, category, skills, salary, overview, requirements, keywords } = req.body

      if (!position || !employmentType || !category || !jobLevel || skills.length < 1 || salary < 1 || !overview ||!requirements || keywords.length < 1)
        return res.status(400).json({ msg: 'Please provide every field in form to create job.' })

      if (overview.length < 100)
        return res.status(400).json({ msg: 'Job overview should be at least 100 characters.' })

      const updatedJob = await Job.findOneAndUpdate({ _id: jobId, organization: isAuthorize._id }, {
        position,
        jobLevel,
        employmentType,
        category,
        skills,
        salary,
        overview,
        requirements,
        keywords
      }, { new: true })
      if (!updatedJob)
        return res.status(404).json({ msg: `Job with ID ${jobId} not found within your organization.` })
      
      return res.status(200).json({
        msg: 'Job has been updated successfully.',
        job: updatedJob
      })
    default:
      return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` })
  }
}

export default connectDB(handler)