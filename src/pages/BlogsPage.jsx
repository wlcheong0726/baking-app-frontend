import BlogsList from "../components/blog/BlogsList";
import FullBlog from '../components/blog/FullBlog';

import Modal from "../components/common/Modal";
import BlogForm from "../components/blog/BlogForm";
import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import apiClient from "../api/apiClient";

function BlogsPage() {
  const[blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      // setLoading(true);
      const response = await apiClient.get('/blogposts'); // invoke REST API asynchronously, returns a promise
      console.log(response.data) // Axios GET request to fetch blogs
      setBlogs(response.data); // Assuming the response data is an array of blog posts
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError(
        error.response?.data?.message ||
        "Failed to fetch blogs. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id) => {
    try {
      const response = await apiClient.delete(`/blogposts/${id}`);

      if (response.status === 200) {
        setBlogs((previousBlogs) => previousBlogs.filter((blog) => blog.id !== id));
      }

      console.log(response.data);

    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  }
  
  function addBlogHandler(blogData) {
    const newBlog = {
      ...blogData,
    };
    setBlogs((existingBlogs) => [...existingBlogs, newBlog]);
  }

    const [ modalIsVisible, setModalIsVisible ] = useState(false);
    
    function hideModalHandler() {
      setModalIsVisible(false);
    }

    function showModalHandler() {
      setModalIsVisible(true);
    }

    if (loading) {
    return <p>Loading blogs...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

    
    return (
      <>
        <div>
            <h1>ALL BLOGS</h1>
        </div>

        <div>
          <button onClick={showModalHandler}>Add New Blog</button>
        </div>

        <Routes>
          <Route index element={<BlogsList 
                                  blogs={blogs} 
                                  onAddBlog={addBlogHandler} 
                                  isAddingNewBlog={modalIsVisible} 
                                  onStopAddingNewBlog={hideModalHandler}
                                  onReadMore={modalIsVisible}
                                  onDeleteBlog={deleteBlog}/>
                                }>
          </Route>
          <Route path=":id" element={<FullBlog blogs={blogs} />}></Route>

        </Routes>
      </>
    );
}

export default BlogsPage