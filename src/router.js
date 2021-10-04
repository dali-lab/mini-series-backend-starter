import { Router } from 'express';
import * as userService from './services/userService';

const router = Router();

router.route('/users')
  .get(async (req, res) => {
    try {
      const { firstName, lastName } = req.query;
      const users = await userService.getUsersByName(firstName, lastName);
      return res.status(200).json(users);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e.message || 'There was an error.' });
    }
  })
  .post(async (req, res) => {
    try {
      const { email, firstName, lastName } = req.body;
      const user = await userService.createUser(email, firstName, lastName);
      return res.status(200).json(user);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e.message || 'There was an error.' });
    }
  });

export default router;
