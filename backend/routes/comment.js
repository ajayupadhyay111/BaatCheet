import express from 'express'
import { addComment, deleteComment, getPostComments } from '../controllers/comment.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/:postId', protect, addComment)
router.get('/:postId', getPostComments)
router.delete('/:commentId', protect, deleteComment)

export default router;
