import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeRoles, isAuthenticated } from './../../../middlewares/auth'
import Job from './../../../models/Job'
import connectDB from './../../../libs/db'

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
      const jobs = await Job.find({ organization: isAuthorize._id }).sort('-createdAt')
      return res.status(200).json({ jobs })
    default:
      return res.status(405).json({ msg: `${req.method} method not allowed for this endpoint.` })
  }
}

export default connectDB(handler)