import { Router } from 'express';
const router = Router();
import { createCondition, findAllConditions } from '../models/conditions.js';


router.get('/', async (req, res) => {
  try {
    const conditionList = await findAllConditions();
    res.json(conditionList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const condition = await createCondition(req.body);
    res.status(201).json(condition);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
