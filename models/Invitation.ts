import mongoose from 'mongoose'

const invitationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Types.ObjectId,
    ref: 'job',
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  status: {
    type: String,
    default: 'on review'
  }
}, {
  timestamps: true
})

const Invitation = mongoose.models.invitation || mongoose.model('invitation', invitationSchema)
export default Invitation