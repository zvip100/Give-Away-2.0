import { Router } from 'express';
import { login } from '../models/login.js';
import { setCookie } from '../middlewares.js';

const router = Router();





router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInfo = await login(email, password);
    setCookie(res, userInfo.token);
    res.json({id: userInfo.id, username: userInfo.username, isAdmin: userInfo.admin});
  } catch (err) {
    let msg = err.message;
    res.status(500).json({ message: msg });
  }
});
export default router;
