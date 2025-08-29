import BlogsList from "../components/blog/BlogsList";
import FullBlog from '../components/blog/FullBlog';

import Modal from "../components/common/Modal";
import BlogForm from "../components/blog/BlogForm";
import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import apiClient from "../api/apiClient";

function BlogsPage() {
    // const mockBlogs = [
    //   {id: 1, title: 'My First Bake', content: 'Today I baked my first cake. It was a strawberry shortcake. It took me 3 hours to make.'},
    //   {id: 2, title: 'Basque Burnt Cheesecake!', content: 'I tried to bake a Basque Burnt Cheesecake today. It is a Spanish cake originated from San Sebastian.'}
    // ]

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
  
  // function addBlogHandler(blogData) {
  //   const newBlog = {
  //     ...blogData,
  //     id: Date.now()
  //   };
  //   setBlogs((existingBlogs) => [newBlog, ...existingBlogs]);
  // }

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
                                  // onAddBlog={addBlogHandler} 
                                  isAddingNewBlog={modalIsVisible} 
                                  onStopAddingNewBlog={hideModalHandler}
                                  onReadMore={modalIsVisible}/>
                                }>
          </Route>
          <Route path=":id" element={<FullBlog blogs={blogs} />}></Route>

        </Routes>

{/* 


        <div>
            <BlogsList isAddingNewBlog={modalIsVisible} onStopAddingNewBlog={hideModalHandler}/>
        </div> */}
      </>
    );
}

export default BlogsPage