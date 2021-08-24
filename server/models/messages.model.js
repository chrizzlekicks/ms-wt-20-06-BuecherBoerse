import mongoose from 'mongoose';

const readByRecipientSchema = new mongoose.Schema(
    {
        _id: false,
        readByUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'readAt'
  }
);

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
        default: Date.now(),
    },
    group: {
        type: String,
        trim: true,
        lowercase: true
        //required: [true, 'Gruppe ist erforderlich']
    },
    readByRecipients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'readAt'
  }
})

export default mongoose.model('Message', MessageSchema);
