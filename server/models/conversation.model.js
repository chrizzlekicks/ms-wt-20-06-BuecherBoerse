import mongoose from 'mongoose';


const ConversationSchema = new mongoose.Schema({
    recipients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
    ],
    topic: {
        type: String,
        trim: true
    },
    group: {
        type: String,
        trim: true,
        lowercase: true
        //required: [true, 'Gruppe ist erforderlich']
    },
    readAt :{
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
);

export default mongoose.model('Conversation', ConversationSchema);
