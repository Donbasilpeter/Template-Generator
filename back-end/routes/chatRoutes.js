import express from 'express';
import { getChatResponse } from '../controllers/chatController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { checkSessionOwnership } from '../middlewares/sessionMiddleware.js';

const router = express.Router();

// Protect the chat route with the JWT middleware
router.get('/', protect,checkSessionOwnership, getChatResponse);

export default router;
