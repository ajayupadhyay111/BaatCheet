import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
import User from "../models/user.js";
import { Notification } from "../models/notification.js";

export const getMyProfile = async (req, res) => {
  try {
    const user = req.user; // added by auth middleware
    res.status(200).json({
      message: "User profile fetched successfully",
      user,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const { username, email, bio, skills } = req.body;
    let avatarUrl = user.avatar; // default to current avatar
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
        folder: "devlink/avatars",
      });
      avatarUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // delete local file
    }

    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.skills = skills ? skills.split(",") : user.skills;
    user.email = email || user.email;
    user.avatar = avatarUrl;

    await user.save();

    res.status(200).json({
      message: "Profile updated",
      user,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

export const updateCoverImage = async (req, res) => {
  try {
    const user = req.user;
    let coverImgUrl = user.coverImg; // default to current cover image
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
        folder: "devlink/cover",
      });
      coverImgUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // delete local file
    }
    user.coverImg = coverImgUrl;
    await user.save();
    res.status(200).json({
      message: "Cover image updated",
      coverImgUrl,
    });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

export const toggleFollow = async (req, res) => {
  try {
    const currentUser = req.user;
    const { userId } = req.params;

    if (currentUser._id.toString() === userId) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    const targetUser = await User.findById(userId);
    if (!targetUser) return res.status(404).json({ message: "User not found" });

    const isFollowing = currentUser.following.includes(userId);

    if (isFollowing) {
      // Unfollow
      currentUser.following.pull(userId);
      targetUser.followers.pull(currentUser._id);

      await currentUser.save(); // save current user first
      await targetUser.save(); // save target user

      // Remove follow notification
      await Notification.deleteOne({
        recipient: userId,
        sender: currentUser._id,
        type: "follow",
      });

      return res.status(200).json({ message: "Unfollowed successfully" });
    }

    // Follow
    currentUser.following.push(userId);
    targetUser.followers.push(currentUser._id);

    await currentUser.save();
    await targetUser.save();

    // Create follow notification
    const notification = new Notification({
      recipient: userId,
      sender: currentUser,
      type: "follow",
    });
    await notification.save();

    res.status(200).json({ message: "Followed successfully", notification });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to toggle follow", error: err.message });
  }
};

export const getPublicProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch public profile", error: err.message });
  }
};
