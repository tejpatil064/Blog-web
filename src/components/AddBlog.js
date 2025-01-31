import React, { useState } from "react";
import "../components/AddBlog.css";
import toast from "react-hot-toast";
import axios from "axios";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    blogImage: "",
  });
   
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    console.log(image);
    if (image) {
      setLoading(true);
      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", "practice");
      imageData.append("cloud_name", "dih4mkdr2");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dih4mkdr2/image/upload",
          {
            method: "POST",
            body: imageData,
          }
        );
        const data = await response.json();
        console.log(data);
        if (data) {
          setFormData((prevState) => ({
            ...prevState,
            blogImage: data.secure_url,
          }));
          toast.success("Image uploaded successfully!");
        } else {
          toast.error("Failed to upload image. Please try again.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("An error occurred during image upload.");
      } finally {
        setLoading(false); // Set loading to false after upload
      }
    } else {
      toast.error("Please select an image to upload.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can add your form validation here
    if (!formData.title || !formData.content) {
      setErrors({ title: "Title is required", content: "Content is required" });
      return;
    }

    try {
      setLoading(true);
      const formURL = "https://register-form-5dub.vercel.app/api/signup";
      // const formURL = "http://localhost:3000/api/blogs"; // Use correct URL
      await axios.post(formURL, formData);
      toast.success("Blog posted successfully!");
      setFormData({
        title: "",
        content: "",
        blogImage: "",
      });
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-blog">
      <p>Add a New Blog</p>
      <form onSubmit={handleSubmit} className="add-blog-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog content here"
          />
          {errors.content && <div className="error">{errors.content}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image (optional)</label>
          <input
            name="blogImage"
            type="file"
            id="blogImage"
            accept="image/*"
            onChange={handleUploadImage}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
