import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  province: {
    type: Number
  },
  city: {
    type: Number
  },
  district: {
    type: Number
  },
  postalCode: {
    type: Number
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
  },
  role: {
    type: String,
    default: 'jobseeker'
  },
  rf_token: {
    type: String
  },
  type: {
    type: String,
    default: 'register'
  }
}, {
  timestamps: true
})

const User = mongoose.models.user || mongoose.model('user', userSchema)
export default User