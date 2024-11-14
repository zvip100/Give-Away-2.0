import { Router } from "express";
import {
  getItemsAmount,
  getGivenAwayAmount,
  getTotalUsers,
  getAllUsers,
} from "../models/admin.js";

const router = Router();

router.get("/reports/item-amount", async (req, res) => {
  try {
    const itemsAmount = await getItemsAmount();
    res.json(itemsAmount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/reports/given-away-amount", async (req, res) => {
  try {
    const givenAwayAmount = await getGivenAwayAmount();
    res.json(givenAwayAmount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/reports/total-users", async (req, res) => {
  try {
    const totalUsers = await getTotalUsers();
    res.json(totalUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/reports/all-users", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
