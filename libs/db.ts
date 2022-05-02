import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

const connectDB = (handler: any) => async(req: NextApiRequest, res: NextApiResponse) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res)
  }

  await mongoose.connect(`${process.env.MONGO_URL}`)
  return handler(req, res)
}

export default connectDB