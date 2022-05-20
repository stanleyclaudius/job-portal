import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeRoles, isAuthenticated } from './../../../middlewares/auth'
import Jobseeker from './../../../models/Jobseeker'
import User from './../../../models/User'
import connectDB from './../../../libs/db'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  let user
  let isAuthorize

  switch (req.method) {
    case 'GET':
      const jobAggregate: any[] = [
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
          }
        },
        { $unwind: '$user' }
      ]

      if (req.query.q) {
        const searchAggregate = {
          $search: {
            index: 'jobseeker',
            text: {
              path: 'skills',
              query: req.query.q
            }
          }
        }

        jobAggregate.unshift(searchAggregate)
      }

      const jobseekers = await Jobseeker.aggregate(jobAggregate)

      return res.status(200).json({ jobseekers })
    case 'PATCH':
      user = await isAuthenticated(req, res)
      if (!user) return 
      
      isAuthorize = await authorizeRoles(user._id, res, 'jobseeker')
      if (!isAuthorize) return

      const { avatar, name, dob, cv, province, city, district, postalCode, skills, about } = req.body
      if (!name)
        return res.status(400).json({ msg: 'Please provide your name.' })

      if (dob) {
        if (new Date(dob).toISOString() > new Date().toISOString()) {
          return res.status(400).json({ msg: 'Date of birth can\'t be greater than current date.' })
        }
      }

      const jobseekerId = isAuthorize._id
      
      const newUser = await User.findOneAndUpdate({ _id: user._id }, {
        name,
        avatar,
        province,
        city,
        district,
        postalCode
      }, { new: true })

      await Jobseeker.findOneAndUpdate({ _id: jobseekerId }, {
        dob,
        cv,
        skills,
        about
      })

      return res.status(200).json({
        msg: 'Profile has been updated successfully.',
        user: newUser
      })
    default:
      return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` })
  }
}

export default connectDB(handler)