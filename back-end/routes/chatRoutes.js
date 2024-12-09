import express from 'express';
import { handleChat } from '../controllers/chatController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect the chat route with the JWT middleware
router.get('/', protect, handleChat);

export default router;
