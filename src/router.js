import { Router } from 'express';
import { requireAuth, requireSignin } from './services/passportService';
import * as userController from './controllers/userController';

const router = Router();

router.route('/users')
  .get(requireAuth, userController.getUsers)
  .post(userController.signUpUser)
  .delete(userController.deleteUser);

router.route('/signin')
  .post(requireSignin, userController.signInUser);

export default router;
