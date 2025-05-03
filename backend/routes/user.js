import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getMyProfile,
  getPublicProfile,
  toggleFollow,
  updateCoverImage,
  updateProfile,
} from "../controllers/user.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/me", protect, getMyProfile);
router.put("/update", protect, upload.single("avatar"), updateProfile);
router.put("/update/coverImg", protect, upload.single("coverImg"), updateCoverImage);
router.put("/follow/:userId", protect, toggleFollow);
router.get("/profile/:userId", getPublicProfile);

export default router;
