import { Notification } from "../models/notification.js";
import Post from "../models/post.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

export const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
        folder: "devlink/posts",
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // delete local file
    }

    const post = await Post.create({
      caption,
      image: imageUrl,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: "Post created", post });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("createdBy", "username avatar")
      .populate({
        path: "comments",
        select: "text createdAt user", // include comment fields
        populate: {
          path: "user",
          select: "username avatar", // populate user who made the comment
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch posts", error: err.message });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ posts });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch your posts", error: err.message });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.createdBy.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You can't like your own post" });
    }

    const liked = post.likes.includes(req.user._id);

    if (liked) {
      post.likes.pull(req.user._id);
      await Notification.deleteOne({
        recipient: post.createdBy,
        sender: req.user._id,
        post: postId,
        type: "like",
      });
      return res.status(200).json({ message: "Post unliked" });
    }

    post.likes.push(req.user._id);

    await post.save();

    const notification = new Notification({
      recipient: post.createdBy,
      sender: req.user._id,
      post: postId,
      type: "like",
    });
    await notification.save();

    res.status(200).json({ message: "Post liked" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to toggle like", error: err.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const user = req.user;

    // apna user object populate karo following ke sath
    await user.populate("following");

    // following users ke IDs nikalo
    const followedUserIds = user.following.map((u) => u._id);

    // apne posts + followed users ke posts fetch karo
    const posts = await Post.find({
      createdBy: { $in: [...followedUserIds, user._id] },
    })
      .populate("createdBy", "username avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ message: "Failed to get feed", error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can't delete this post" });
    }

    await post.remove();

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete post", error: err.message });
  }
};
