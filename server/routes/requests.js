import { Router } from 'express';
const router = Router();
import { createRequest, findAllRequests } from '../models/requests.js';



router.get('/', async (req, res) => {
  let user = req.user;
  try {
    const requestList = await findAllRequests(user);
    res.json(requestList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const request = await createRequest(req.body,user);
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
