import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Views/Home";
import AddBlog from "./components/AddBlog";
import Blogs from "./components/Blogs";
import EditBlog from "./components/EditBlog";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/addblog" element={<AddBlog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
