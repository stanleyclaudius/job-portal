import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Types.ObjectId,
    ref: 'organization',
    required: true
  },
  position: {
    type: String,
    required: true
  },
  jobLevel: {
    type: String,
    required: true
  },
  employmentType: {
    type: String,
    required: true
  },
  skills: {
    type: Array,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  overview: {
    type: String,
    required: true,
    minlength: 100
  },
  requirements: {
    type: String,
    required: true
  },
  keywords: {
    type: Array,
    required: true
  },
  applicants: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'jobseeker'
    }
  ]
}, {
  timestamps: true
})

const Job = mongoose.models.job || mongoose.model('job', jobSchema)
export default Job