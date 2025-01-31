import express from "express";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controller/blogController.js";
import Blog from "../models/Blog.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  res.json({ blog });
});
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
