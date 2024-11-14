import { Router } from 'express';
import { findUserById } from '../models/users.js';


const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user || user.length == 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



export default router;
