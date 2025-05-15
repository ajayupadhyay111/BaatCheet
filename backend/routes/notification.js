import express from 'express'
import { getNotifications, markAsRead } from '../controllers/notification.js'
import { protect } from '../middlewares/authMiddleware.js'
const router = express.Router()

// Get all notifications for a user
router.get('/', protect, getNotifications)
router.post('/read', protect, markAsRead)

export default router;
