// Blogs.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/SearchBar.js"; // Import the SearchBar component
import "../components/Blogs.css"; // Make sure you import the CSS

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(6); // Show 6 blogs per page

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Fetch the data from the backend
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Handle delete blog
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/blogs/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the indexes for the blogs to show (pagination)
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Calculate total pages for the filtered blogs
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <>
      <div className="blogs-container">
        <div className="blogs-header">
          <h1 className="blogs-titlee">Blogs</h1>

          {/* Search Bar Component */}
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Conditional rendering for no blogs */}
        {filteredBlogs.length === 0 ? (
          <p className="no-blogs-message">No blogs found</p>
        ) : (
          <div className="blogs-grid">
            {currentBlogs.map((blog) => (
              <div key={blog._id} className="blog-card">
                <img
                  className="blog-image"
                  src={blog.blogImage}
                  alt={blog.title}
                />
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-content">{blog.content}</p>

                <div className="blog-actions">
                  <Link to={`/edit/${blog._id}`} className="edit-link">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Pre
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`pagination-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Blogs;
