import { Router } from "express";
const router = Router();
import { createCategory, findAllCategories } from "../models/categories.js";

router.get("/", async (req, res) => {
  try {
    const categoryList = await findAllCategories();
    res.json(categoryList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const category = await createCategory(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
