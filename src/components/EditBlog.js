import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/EditBlog.css";


function EditBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [imageFile, setImageFile] = useState(null); // To store the selected file
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `https://blog-web-backend.vercel.app/api/blogs/${id}`
      );
      // const response = await axios.get(`http://localhost:3000/api/blogs/${id}`);
      console.log(response.data);
      const { title, content, blogImage } = response.data.blog;
      setTitle(title);
      setContent(content);
      setBlogImage(blogImage);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  // Handle the image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  // Upload the image to the server or Cloudinary
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "practice");
    formData.append("cloud_name", "dih4mkdr2"); // Cloudinary preset or backend setting

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dih4mkdr2/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedImage = blogImage;

    // If an image is selected, upload it
    if (imageFile) {
      updatedImage = await uploadImage(imageFile);
    }
    console.log(updatedImage);
    try {
      console.log(updatedImage);
      // await axios.put(`http://localhost:3000/api/blogs/${id}`, {
      //   title,
      //   content,
      //   blogImage: updatedImage, // Use the updated image URL
      // });
      await axios.put(`https://blog-web-backend.vercel.app/api/blogs/${id}`, {
        title,
        content,
        blogImage: updatedImage, // Use the updated image URL
      });
      navigate("/blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div>
      {/* <Navbar /> */}

      <div className="edit-blog">
        <h2>Edit Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          {blogImage ? <img src={blogImage} /> : ""}

          {/* Image Upload Input */}
          <div className="form-group">
            <label htmlFor="blogImage">Change Image:</label>
            <input
              type="file"
              id="blogImage"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <button type="submit" className="update-button">
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBlog;
