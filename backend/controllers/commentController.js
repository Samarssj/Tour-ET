import Comment from "../Models/commentModel.js";
import User from "../Models/userModel.js";
import { authorizationChecker } from "../middleware/auth.js";

export const getComment = async (req, res) => {
  try {
    const comments = await Comment.find({});
    return res.status(200).json({ data: comments });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const authorized = await authorizationChecker(req);
    if (authorized === "A") {
      return res.status(401).json({ msg: "token reqired" });
    } else if (authorized === "C") {
      return res.status(401).json({ msg: "not authorized" });
    }
    const { pkg, text } = req.body;

    const newcomment = { user: authorized.name, pkg, text };

    const comment = await Comment.create(newcomment);
    return res.status(201).json({ data: comment });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const comments = await Comment.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (!comments) {
      res.status(404).json({ msg: "no such commet" });
    }
    return res.status(201).json({ data: comments });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const reactToComment = async (req, res) => {
  try {
    const authorized = await authorizationChecker(req);
    if (typeof authorized === "string") {
      return res.status(401).json({ msg: "Please login to react to a review" });
    }

    const { reaction } = req.body;
    if (!["like", "dislike", "none"].includes(reaction)) {
      return res.status(400).json({ msg: "Invalid reaction" });
    }

    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ msg: "Review not found" });
    }

    const commentId = comment._id;
    const liked = (authorized.likedComment || []).some((id) => String(id) === String(commentId));
    const disliked = (authorized.dislikedComment || []).some((id) => String(id) === String(commentId));
    const currentReaction = liked ? "like" : disliked ? "dislike" : "none";
    const nextReaction = currentReaction === reaction ? "none" : reaction;

    if (currentReaction === nextReaction) {
      return res.status(200).json({
        data: comment,
        reaction: currentReaction,
      });
    }

    const commentUpdate = {};
    if (currentReaction === "like") commentUpdate.$inc = { like: -1 };
    if (currentReaction === "dislike") commentUpdate.$inc = { dislike: -1 };
    if (nextReaction === "like") commentUpdate.$inc = { ...(commentUpdate.$inc || {}), like: 1 };
    if (nextReaction === "dislike") commentUpdate.$inc = { ...(commentUpdate.$inc || {}), dislike: 1 };

    const userUpdate = { $pull: {} };
    if (currentReaction === "like") userUpdate.$pull.likedComment = commentId;
    if (currentReaction === "dislike") userUpdate.$pull.dislikedComment = commentId;
    if (nextReaction === "like") userUpdate.$push = { likedComment: commentId };
    if (nextReaction === "dislike") userUpdate.$push = { dislikedComment: commentId };

    const [updatedComment] = await Promise.all([
      Comment.findByIdAndUpdate(commentId, commentUpdate, { new: true }),
      User.findByIdAndUpdate(authorized._id, userUpdate),
    ]);

    return res.status(200).json({
      data: updatedComment,
      reaction: nextReaction,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
