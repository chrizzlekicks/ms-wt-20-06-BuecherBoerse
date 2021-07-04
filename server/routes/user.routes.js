import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import GrpCtrl from '../controllers/group.controller'

const router = express.Router()

router.route('/api/users')
    .get(authCtrl.requireSignin, authCtrl.signinError, userCtrl.list) // Show users with GET
    .post(userCtrl.create) // Create user with POST

router.route('/api/users/:userId')
    .get(authCtrl.requireSignin, GrpCtrl.hasGroupAuthorization, userCtrl.read) // Showing a user with GET
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update) // Update with PUT
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove) // Remove with DELETE

router.param('userId', userCtrl.userByID)

export default router