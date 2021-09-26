import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        reciever: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        message: {
            type: String,
            required: [true, 'Bitte Nachricht eingeben']
        },
        group: {
            type: String,
            trim: true,
            lowercase: true
            //required: [true, 'Gruppe ist erforderlich']
        }
    },
    {
        timestamps: {
            createdAt: 'createdAt'
        }
    }
);

export default mongoose.model('Message', MessageSchema);
