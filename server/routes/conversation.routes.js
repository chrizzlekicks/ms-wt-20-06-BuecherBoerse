import express from 'express'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'
import conversationCtrl from '../controllers/conversation.controller'

const router = express.Router()

router.route('/api/messages')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorizationForNewMessage, conversationCtrl.createConv) // Create conversation authCtrl.requireSignin, 

// authCtrl.requireSignin, authCtrl.hasAuthorizationForConversation
// Erstelle Nachricht in bestimmter Conversation, erhalte bestimmte Conversation
// Loesche Konversation
router.route('/api/messages/:convId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorizationForConversation, conversationCtrl.read)
    .post(authCtrl.requireSignin, authCtrl.hasAuthorizationForConversation, conversationCtrl.writeMessage)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorizationForConversation, conversationCtrl.deleteConvByID)

// New Route for messages counter?

// Erhalte alle Conversations in denen der User beteiligt ist
router.route('/api/messages/user/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, conversationCtrl.getConvByUser, conversationCtrl.countUnreadMessages)

router.param('convId', conversationCtrl.convByID)
router.param('userId', userCtrl.userByID)

export default router