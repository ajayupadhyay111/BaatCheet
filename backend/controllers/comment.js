import Comment from "../models/comment.js";
import Post from "../models/post.js";
import {Notification} from "../models/notification.js";

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;
    const userId = req.user._id;
    
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });  

    const comment = await Comment.create({
      text,
      post: postId,
      user: userId,
    });

    // add comment to post

    post.comments.push(comment._id);
    await post.save();

    // Create comment notification
    const notification = new Notification({
      recipient: post.createdBy, // Post creator gets the notification
      sender: userId, // Commenter
      type: "comment",
      post: postId,
      comment:text,
    });
    await notification.save();

    res.status(201).json({ message: "Comment added", comment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add comment", error: err.message });
  }
};

export const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("user", "username avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({ comments });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get comments", error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own comments" });
    }

    await comment.remove();
    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete comment", error: err.message });
  }
};
