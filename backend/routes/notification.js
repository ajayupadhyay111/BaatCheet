import express from 'express'
import { getNotifications } from '../controllers/notification.js'
import { protect } from '../middlewares/authMiddleware.js'
const router = express.Router()

// Get all notifications for a user
router.get('/', protect, getNotifications)

export default router
