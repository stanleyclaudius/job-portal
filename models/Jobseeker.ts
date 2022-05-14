import mongoose from 'mongoose'

const jobseekerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  cv: {
    type: String,
    default: ''
  },
  dob: {
    type: Date,
    default: ''
  },
  skills: {
    type: Array
  },
  about: {
    type: String,
    minlength: 100
  }
}, {
  timestamps: true
})

const Jobseeker = mongoose.models.jobseeker || mongoose.model('jobseeker', jobseekerSchema)
export default Jobseeker