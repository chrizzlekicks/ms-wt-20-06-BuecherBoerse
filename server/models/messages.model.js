import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    type: String,
    required: 'Bitte Nachricht eingeben',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Message', MessageSchema);
