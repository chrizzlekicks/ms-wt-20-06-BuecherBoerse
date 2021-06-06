import mongoose from 'mongoose'
import User from '../models/user.model'

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
        required: [true, 'Bitte Nachricht eingeben'],
    },
    created: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model('Message', MessageSchema)