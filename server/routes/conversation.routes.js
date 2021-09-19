import express from 'express';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';
import conversationCtrl from '../controllers/conversation.controller';

const router = express.Router();

// Check auth first
router.use(authCtrl.requireSignin);

// refactor route dont use params, add them to routes if needed
// with req.query

// Route: /api/messages
// Create conversation
router
  .route('/')
  .post(authCtrl.hasAuthorizationForNewMessage, conversationCtrl.createConv);

// Route for messages counter
router
  .route('/unread/:convId')
  .get(
    authCtrl.hasAuthorizationForConversation,
    conversationCtrl.countUnreadMessages
  );

// Erstelle Nachricht in bestimmter Conversation, erhalte bestimmte Conversation
// Loesche Konversation
router
  .route('/:convId')
  .all(authCtrl.hasAuthorizationForConversation)
  .get(conversationCtrl.read)
  .post(conversationCtrl.writeMessage)
  .delete(conversationCtrl.deleteConvByID);

// Erhalte alle Conversations in denen der User beteiligt ist
router
  .route('/user/:userId')
  .get(
    authCtrl.hasAuthorization,
    conversationCtrl.getConvByUser,
    conversationCtrl.read
  );

// Needed for Auth
router.param('convId', conversationCtrl.convByID);
router.param('userId', userCtrl.userByID);

export default router;
