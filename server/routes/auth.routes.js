import express from 'express'
import authCtrl from '../controllers/auth.controller'
import resetCtrl from '../controllers/reset.controller'

const router = express.Router()

router.route('/auth/signin').post(authCtrl.signin)
router.route('/auth/signout').get(authCtrl.signout)

router.route('/api/resetpassword').post(resetCtrl.requestPasswordReset) // Request password reset

export default router