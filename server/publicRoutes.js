import express from 'express';
import conditionRoutes from './routes/conditions.js';
import itemRoutes from './routes/items.js';
import categoryRoutes from './routes/categories.js';
import registerRoutes from './routes/register.js';
import loginRoutes from './routes/login.js';
import adminRoutes from './routes/admin.js';

const publicRouter = express.Router();

// Define public routes

publicRouter.use('/conditions', conditionRoutes);
publicRouter.use('/items', itemRoutes);
publicRouter.use('/categories', categoryRoutes);
publicRouter.use('/register', registerRoutes);
publicRouter.use('/login', loginRoutes);
publicRouter.use('/admin', adminRoutes)

publicRouter.all('/debugRoute', (req, res) => {
  res.json({ message: `Debug method [${req.method}] is working`, timestamp: new Date() });
  });

// Export the public router
export default publicRouter;
