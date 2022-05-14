import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeRoles, isAuthenticated } from './../../../middlewares/auth'
import Job from './../../../models/Job'
import connectDB from './../../../libs/db'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ msg: `${req.method} method not allowed for this endpoint.` })

  const user = await isAuthenticated(req, res)
  if (user) {
    const isAuthorize = await authorizeRoles(user._id, res, 'organization')
    
    if (isAuthorize && isAuthorize.status === 'accepted') {
      const { position, skills, salary, overview, requirements, keywords } = req.body

      if (!position || skills.length < 1 || salary < 1 || !overview ||!requirements || keywords.length < 1)
        return res.status(400).json({ msg: 'Please provide every field in form to create job.' })

      if (overview.length < 100)
        return res.status(400).json({ msg: 'Job overview should be at least 100 characters.' })
        
      const newJob = new Job({
        organization: isAuthorize._id,
        position,
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
  }
}

export default connectDB(handler)