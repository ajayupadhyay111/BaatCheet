import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getFeedPosts,
  getMyPosts,
  toggleLike,
} from "../controllers/post.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/create", protect, upload.single("image"), createPost);
router.get("/all", getAllPosts);
router.get("/mine", protect, getMyPosts);
router.put("/like/:postId", protect, toggleLike);
router.get("/feed", protect, getFeedPosts);
router.delete("/delete/:postId", protect, deletePost);
export default router;
