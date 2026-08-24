
import express from "express";

// import controllers
import { getComment, addComment, updateComment, reactToComment } from "../controllers/commentController.js";

const commentRouter = express.Router();


/** 
 * getComment: to get comment on a specific package
 * addComment: for adding a comment on a package
 * updateComment: for updating an existing comment
 */
commentRouter.get("/", getComment);
commentRouter.post("/", addComment);
commentRouter.patch("/:id", updateComment);
commentRouter.patch("/:id/reaction", reactToComment);



export default commentRouter;
