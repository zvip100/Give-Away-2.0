import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {
  createItem,
  findAllItems,
  updateItemImage,
  findItemById,
  updateItemStatus,
  addToWatchList,
  getWatchList,
} from "../models/items.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Directory for uploaded images

// Serve static files from the uploads directory
router.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Get all items
router.get("/", async (req, res) => {
  console.log("requested items");
  try {
    const itemList = await findAllItems();
    res.json(itemList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get item by ID
router.get("/:id", async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await findItemById(itemId); // Ensure this function is defined in your model
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new item
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const item = await createItem(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get an item
router.post("/get-item/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    console.log("get item post req: ", req.body.currentUser);
    const item = await updateItemStatus(itemId, req.body.currentUser);
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Upload an image for an item
router.post("/upload/:id", upload.single("image"), async (req, res) => {
  const itemId = req.params.id;
  const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`; // Create the image URL

  try {
    const updatedItem = await updateItemImage(itemId, imageUrl); // Ensure this function is defined in your model
    res.json({ message: "Image uploaded successfully", updatedItem });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/watch_list/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.body.currentUser;
    const item = await addToWatchList(itemId, userId);
    if (item === true) {
      res.status(409).json("already added");
      return;
    }
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/watch_list/:user_id", async (req, res) => {
  const userId = req.params.user_id;

  try {
    const watchListItems = await getWatchList(userId);
    res.json(watchListItems);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
