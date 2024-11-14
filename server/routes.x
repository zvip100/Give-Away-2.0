import express from 'express';
import userRoutes from './routes/users.js';
import categoryRoutes from './routes/categories.js';
import conditionRoutes from './routes/conditions.js';
import itemRoutes from './routes/items.js';
import requestRoutes from './routes/requests.js';
import messageRoutes from './routes/messages.js';

const router = express.Router();

// Define your routes
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/conditions', conditionRoutes);
router.use('/items', itemRoutes);
router.use('/requests', requestRoutes);
router.use('/messages', messageRoutes);

// Export the router using ES module syntax
export default router;
