import express from 'express';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

// Add Validator to post for mail,passwort and Username
// sanitize input
router
    .route('/api/users')
    .get(authCtrl.requireSignin, userCtrl.list) // Show users with GET
    .post(userCtrl.create); // Create user with POST

// Add Validator to put for passwort and Username
// sanitize input
// Check for fields
router
    .route('/api/users/:userId')
    .get(authCtrl.requireSignin, userCtrl.read) // Showing a user with GET
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update) // Update with PUT
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove); // Remove with DELETE

router.param('userId', userCtrl.userByID);

export default router;
