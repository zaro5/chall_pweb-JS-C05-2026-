// src/routes/comment.routes.ts
import { Router } from "express";
import {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "../controllers/commentController.js";

const router = Router();

router.post("/", createComment);       // Create
router.get("/", getAllComments);       // Read
router.patch("/:id", updateComment);   // Update
router.delete("/:id", deleteComment);  // Delete

export default router;