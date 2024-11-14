import { Router } from 'express';
const router = Router();
import { createMessage, findAllMessages } from '../models/messages.js';



router.get('/', async (req, res) => {
  try {
    const messageList = await findAllMessages();
    res.json(messageList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const message = await createMessage(req.body);
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
