import mongoose from 'mongoose'

const organizationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    required: true
  },
  totalEmployee: {
    type: Number,
    required: true
  },
  industryType: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'on review'
  }
}, {
  timestamps: true
})

const Organization = mongoose.models.organization || mongoose.model('organization', organizationSchema)
export default Organization