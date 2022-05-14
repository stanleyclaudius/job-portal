import mongoose from 'mongoose'

const jobsAppliedSchema = new mongoose.Schema({
  job: {
    type: mongoose.Types.ObjectId,
    ref: 'job',
    required: true
  },
  jobseeker: {
    type: mongoose.Types.ObjectId,
    ref: 'jobseeker',
    required: true
  },
  status: {
    type: String,
    default: 'on review'
  }
}, {
  timestamps: true
})

const JobsApplied = mongoose.models.jobsApplied || mongoose.model('jobsApplied', jobsAppliedSchema)
export default JobsApplied