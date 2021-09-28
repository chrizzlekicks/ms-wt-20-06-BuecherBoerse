import express from 'express';
import authCtrl from '../controllers/auth.controller';
import resetCtrl from '../controllers/reset.controller';

const router = express.Router();

// Add Validator for mail,passwort and Username
// sanitize input
// Check for fields
router.route('/auth/signin').post(authCtrl.signin);
router.route('/auth/signout').get(authCtrl.signout);

// Add Validator for mail
// sanitize input
// Check for fields
router.route('/auth/requestPasswordReset').post(resetCtrl.requestPasswordReset); // Request password reset
router.route('/auth/resetPassword').post(resetCtrl.resetPassword); // Reset Password

export default router;
