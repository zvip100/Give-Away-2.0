// routes/privateRoutes.js
import express from 'express';
import userRoutes from './routes/users.js'; 
import requestRoutes from './routes/requests.js';
import messageRoutes from './routes/messages.js'; 
import { authenticateJWT } from './middlewares.js'; 

const privateRouter = express.Router();

// Apply JWT authentication middleware to all private routes
privateRouter.use(authenticateJWT);

// Define private routes
privateRouter.use('/users', userRoutes);
privateRouter.use('/requests', requestRoutes);
privateRouter.use('/messages', messageRoutes);

// Export the private router
export default privateRouter;
