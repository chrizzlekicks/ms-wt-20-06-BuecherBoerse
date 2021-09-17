import express from 'express';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';
import conversationCtrl from '../controllers/conversation.controller';

const router = express.Router();

// Check auth first
router.use(authCtrl.requireSignin);

// Create conversation
router
  .route('/api/messages')
  .post(authCtrl.hasAuthorizationForNewMessage, conversationCtrl.createConv);

// Route for messages counter
router
  .route('/api/messages/unread/:convId')
  .get(
    authCtrl.hasAuthorizationForConversation,
    conversationCtrl.countUnreadMessages
  );

// Erstelle Nachricht in bestimmter Conversation, erhalte bestimmte Conversation
// Loesche Konversation
router
  .route('/api/messages/:convId')
  .get(authCtrl.hasAuthorizationForConversation, conversationCtrl.read)
  .post(authCtrl.hasAuthorizationForConversation, conversationCtrl.writeMessage)
  .delete(
    authCtrl.hasAuthorizationForConversation,
    conversationCtrl.deleteConvByID
  );

// Erhalte alle Conversations in denen der User beteiligt ist
router
  .route('/api/messages/user/:userId')
  .get(
    authCtrl.hasAuthorization,
    conversationCtrl.getConvByUser,
    conversationCtrl.read
  );

// Needed for Auth
router.param('convId', conversationCtrl.convByID);
router.param('userId', userCtrl.userByID);

export default router;
