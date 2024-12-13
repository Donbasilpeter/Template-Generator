import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { getAllSessions,deleteSession,getSessionById,updateSessionName } from '../controllers/sessionController.js';
import { checkSessionOwnership } from '../middlewares/sessionMiddleware.js';


const router = express.Router();

// Protect the chat route with the JWT middleware
router.get('/', protect, getAllSessions);
router.delete('/:sessionId', protect,checkSessionOwnership, deleteSession);
router.get('/:sessionId', protect,checkSessionOwnership, getSessionById);
router.put('/:sessionId', protect,checkSessionOwnership, updateSessionName);




export default router;
