import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Link to="/addblog">Add Blog</Link>
      <Link to="/blogs">Blogs</Link>
    </>
  );
};

export default Home;
