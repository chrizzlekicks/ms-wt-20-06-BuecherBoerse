import Conversation from '../models/conversation.model'
import Message from '../models/messages.model'


const createConv = async (req, res) => {
    // Erstelt erste Nachricht und die zugehoerige Conversation
    // Füge erste Nachricht zu Conversation hinzu
    // add current user as sender
    req.body.sender = req.auth._id
    const message = new Message(req.body)

    // Erstelle Conversation für Nachricht
    req.body.recipients = [req.body.sender, req.body.reciever]
    req.body.messages = [message._id]
    const conversation = new Conversation(req.body)

    try {
        // Speichere Nachricht
        await message.save()
        // Speichere Conversation
        await conversation.save()
        return res.status(200).json({
            message: "Nachricht erfolgreich gesendet!",
            nachricht: message,
            conversation: conversation
        })
    } catch (err) {
        return res.status(400).json({
            what: err.name
        })
    }
}

// Update conversation with new message
const writeMessage = async (req, res) => {
    // add current user as sender
    req.body.sender = req.auth._id
    const message = new Message(req.body)

    try {
        await message.save()
        // Add message to conversation
        let conversation = await Conversation.findByIdAndUpdate(req.conv._id, { $push: { messages: message } }, { new: true, useFindAndModify: false }).exec()

        return res.status(200).json({
            message: "Nachricht erfolgreich gesendet!",
            nachricht: message,
            conversation: conversation
        })
    } catch (err) {
        return res.status(400).json({
            what: err.name
        })
    }
}

// Get All Conversations from User
const getConvByUser = async (req, res, next) => {
    try {
        // populate messages.send _id name
        let convs = await Conversation.find({ recipients: req.params.userId }).populate("recipients", "_id name").populate("messages", "_id message sender reciever").exec()
        if (!convs) {
            return res.status('400').json({
                error: 'User has no conversations',
            });
        }

        // Add found conversations to req for counting
        req.convs = convs
        next()
    } catch (err) {
        return res.status('400').json({
            what: err.name
        });
    }
};

const read = (req, res) => {
    return res.json(req.conv);
};

// Füge die Conversation mit bestimmer ID zum request hinzu 
const convByID = async (req, res, next, id) => {
    try {
        const conv = await Conversation.findById(id).populate("recipients", "_id name").populate("messages", "_id message sender reciever").exec();
        if (!conv) {
            return res.status('400').json({
                error: "Conversation not found"
            });};

        // check if sender of last message is not current user, then update readAt timestamp
        // messages.slice(-1)[0] 
        // messages[messages.length -1]
        if(conv.messages.at(-1).sender != req.auth._id){
            await conv.updateOne({ readAt: Date.now }).exec();
        };

        req.conv = conv;
        next();
    } catch (err) {
        return res.status('400').json({
            what: err.name
        })
    }
}

// Update message readby
// Only update single conversation
const countUnreadMessages = async (req, res) => {
    // find convs of user and populate with message ids
    let counterUnread = 0
    // filter messages, with time stamps and last sender

    try {
    //     Order.find({ "articles.quantity": { "$gte": 5 } })
    // .populate({
    //     "path": "articles.article",
    //     "match": { "price": { "$lte": 500 } }
    // }).exec(function(err,orders) {
    //     orders = orders.filter(function(order) {
    //         order.articles = order.articles.filter(function(article) {
    //             return (
    //                 ( article.quantity >= 5 ) &&
    //                 ( article.article != null )
    //             )
    //         });
    //         return order.aricles.length > 0;
    //     })

    //     // orders has non matching entries removed            
    //     }
    //     )

        const conv = Conversation.findById(id).where("updatedAt").gt("readAt").populate({
            "path": "messages.sender",
            "match": { "sender":  req.auth._id }
        }).limit(5).countDocuments();
        //const conv = Conversation.findById(id).where("updatedAt").gt("readAt").populate("messages", "sender").where("messages.sender").equals(req.auth._id).countDocuments();
        //const conv = Conversation.findById(id).where("updatedAt").gt("readAt").populate("messages", "sender").where("conversations.messages.sender").in(req.auth._id).limit(10).countDocuments();
        //exec();

        const 

    return res.status(200).json({
        message: 'Unread Conversations successfully requested!',
        unreadcounter: counterUnread
    });

    } catch (error) {
        return res.status('400').json({
            what: err.name
        });
    }
}


const deleteConvByID = async (req, res) => {
    try {
        let conv = req.conv;
        let isLastRecipient = false
        if (req.conv.recipients.length <= 1) {
            isLastRecipient = true
        }

        if (isLastRecipient == true) {
            // Delete conv if last iser
            let deletedConv = await conv.remove();

            return res.status(200).json({
                message: 'Conversation successfully deleted!',
                conversation: deletedConv,
            });
        }
        else {
            // Remove rec if not last else remove conv
            let newRecipients = []
            req.conv.recipients.forEach(recipient => {
                if (recipient._id != req.auth._id) {
                    newRecipients.push(recipient)
                }
            });

            conv.recipients = newRecipients
            await conv.save();

            return res.status(200).json({
                message: 'User from Conversation successfully removed!',
                conversation: conv,
            });
        }

    } catch (err) {
        return res.status(400).json({
            what: err.name
        });

    }
}

export default { createConv, convByID, read, writeMessage, getConvByUser, deleteConvByID, countUnreadMessages }