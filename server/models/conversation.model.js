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
    created: {
        type: Date,
        default: Date.now,
    },
    // BookId als betreff
    updated: Date, // Last message
    group: {
        type: String,
        trim: true,
        lowercase: true
        //required: [true, 'Gruppe ist erforderlich']
    }
});

export default mongoose.model('Conversation', ConversationSchema);
