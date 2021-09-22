import Conversation from '../models/conversation.model';
import Message from '../models/messages.model';

const createConv = async (req, res) => {
  // Erstelt erste Nachricht und die zugehoerige Conversation
  // Füge erste Nachricht zu Conversation hinzu
  // add current user as sender
  req.body.sender = req.auth._id;
  const message = new Message(req.body);

  // Erstelle Conversation für Nachricht
  req.body.recipients = [req.body.sender, req.body.reciever];
  req.body.messages = [message._id];
  const conversation = new Conversation(req.body);

  try {
    // Speichere Nachricht
    await message.save();
    // Speichere Conversation
    await conversation.save();
    return res.status(201).json({
      message: 'Nachricht erfolgreich gesendet!',
      nachricht: message,
      conversation: conversation,
    });
  } catch (err) {
    return res.status(500).json({
      what: err.name,
    });
  }
};

// Update conversation with new message
const writeMessage = async (req, res) => {
  // add current user as sender
  req.body.sender = req.auth._id;
  const message = new Message(req.body);

  try {
    await message.save();
    // Add message to conversation
    let conversation = await Conversation.findByIdAndUpdate(
      req.conv._id,
      { $push: { messages: message } },
      { new: true }
    ).exec();

    return res.status(201).json({
      message: 'Nachricht erfolgreich gesendet!',
      nachricht: message,
      conversation: conversation,
    });
  } catch (err) {
    return res.status(500).json({
      what: err.name,
    });
  }
};

// Get All Conversations from User
const getConvByUser = async (req, res, next) => {
  try {
    // populate messages.send _id name
    let convs = await Conversation.find({ recipients: req.params.userId })
      .populate('recipients', '_id name')
      .populate('messages', '_id message sender reciever createdAt')
      .exec();
    if (!convs) {
      return res.status(404).json({
        error: 'User has no conversations',
      });
    }

    // Add found conversations to req for counting
    req.conv = convs;
    next();
  } catch (err) {
    return res.status(500).json({
      what: err.name,
    });
  }
};

// Füge die Conversation mit bestimmer ID zum request hinzu
const convByID = async (req, res, next, id) => {
  try {
    const conv = await Conversation.findById(id)
      .populate('recipients', '_id name')
      .populate('messages', '_id message sender reciever createdAt')
      .exec();
    if (!conv) {
      return res.status(404).json({
        error: 'Conversation not found',
      });
    }

    // check if sender of last message is not current user, then update readAt timestamp
    // messages.slice(-1)[0]
    // messages[messages.length -1]
    if (conv.messages.slice(-1)[0].sender != req.auth._id) {
      await conv
        .updateOne({ readAt: Date.now() }, { timestamps: false })
        .exec();
    }

    req.conv = conv;
    next();
  } catch (err) {
    return res.status(500).json({
      what: err.name,
      err: err.message,
    });
  }
};

// Update message readby
// Only update single conversation
const countUnreadMessages = async (req, res) => {
  try {
    const conv = req.conv;
    let counterUnread = 0;

    if (conv.updatedAt > conv.readAt) {
      // Only Check last 5 messages
      for (let i = 0; i < 5; i++) {
        if (conv.messages.slice(-1)[i].sender != req.auth._id) {
          counterUnread = counterUnread + 1;
        }
      }
    }

    return res.status(200).json({
      message: 'Unread Conversations successfully requested!',
      unread: counterUnread,
    });
  } catch (error) {
    return res.status(500).json({
      what: err.name,
    });
  }
};

const deleteConvByID = async (req, res) => {
  try {
    let conv = req.conv;
    let isLastRecipient = false;
    if (req.conv.recipients.length <= 1) {
      isLastRecipient = true;
    }

    if (isLastRecipient == true) {
      // Delete conv if last iser
      let deletedConv = await conv.remove();

      return res.status(200).json({
        message: 'Conversation successfully deleted!',
        conversation: deletedConv,
      });
    } else {
      // Remove current user from conv
      let recipients = req.conv.recipients;
      let pos = recipients.indexOf(req.auth._id);
      // remove one element after pos (e.g. only the element on pos)
      recipients.splice(pos, 1);

      conv.recipients = recipients;
      await conv.save();

      return res.status(200).json({
        message: 'User from Conversation successfully removed!',
        conversation: conv,
      });
    }
  } catch (err) {
    return res.status(500).json({
      what: err.name,
    });
  }
};

const read = (req, res) => {
  return res.status(200).json(req.conv);
};

export default {
  createConv,
  convByID,
  read,
  writeMessage,
  getConvByUser,
  deleteConvByID,
  countUnreadMessages,
};
