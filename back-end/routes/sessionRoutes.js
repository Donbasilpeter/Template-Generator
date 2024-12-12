import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { getAllSessions } from '../controllers/sessionController.js';

const router = express.Router();

// Protect the chat route with the JWT middleware
router.get('/', protect, getAllSessions);

export default router;
