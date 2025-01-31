import Blog from "../models/Blog.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

export const createBlog = async (req, res) => {
  const { title, content, blogImage } = req.body;

  try {
    const newBlog = new Blog({ title, content, blogImage });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: "Error creating blog" });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, blogImage } = req.body;
  // if (!title || !content || !blogImage) {
  //   res.json({ message: "All fields are required" });
  // }
  console.log(blogImage);
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, blogImage },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: "Error updating blog" });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting blog" });
  }
};
