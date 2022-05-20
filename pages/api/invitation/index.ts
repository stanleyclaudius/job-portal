import { NextApiRequest, NextApiResponse } from 'next'
import { authorizeRoles, isAuthenticated } from './../../../middlewares/auth'
import Invitation from './../../../models/Invitation'
import connectDB from './../../../libs/db'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  const user = await isAuthenticated(req, res)
  if (!user) return

  let isAuthorize

  switch (req.method) {
    case 'POST':
      isAuthorize = await authorizeRoles(user._id, res, 'organization')
      if (!isAuthorize) return

      const { jobId, userId } = req.body
      if (!jobId || !userId)
        return res.status(400).json({ msg: 'Please provide job and user ID.' })

      const newInvitation = new Invitation({
        job: jobId,
        user: userId
      })
      await newInvitation.save()

      return res.status(200).json({
        msg: 'Invitation sent.',
        invitation: newInvitation
      })
    case 'GET':
      isAuthorize = await authorizeRoles(user._id, res, 'organization', 'jobseeker')
      if (!isAuthorize) return

      const userRole = user.role

      if (userRole === 'jobseeker') {
        const invitations = await Invitation.aggregate([
          { $match: { user: user._id } },
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
              ],
              as: 'job'
            }
          },
          { $unwind: '$job' }
        ])

        return res.status(200).json({ invitations })
      } else if (userRole === 'organization') {
        const invitations = await Invitation.find().populate('job')
        return res.status(200).json({ invitations })
      }
    default:
      return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` })
  }
}

export default connectDB(handler)