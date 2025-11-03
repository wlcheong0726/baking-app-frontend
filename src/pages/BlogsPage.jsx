import BlogsList from "../components/blog/BlogsList";
import FullBlog from '../components/blog/FullBlog';

import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import apiClient from "../api/apiClient";
import classes from './BlogsPage.module.css'

function BlogsPage() {
  const [isAddingNewBlog, setIsAddingNewBlog] = useState(false);
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const[blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogToEdit, setBlogToEdit] = useState(null);

  // Request parameters
  const[pageNo, setPageNo] = useState(1);
  const[pageSize, setPageSize] = useState(20);
  const[sortBy, setSortBy] = useState('createdAt');
  const[sortDir, setSortDir] = useState('desc');
  const[keyword, setKeyword] = useState('');

  // Response parameters
  const[totalPages, setTotalPages] = useState(1);
  const[totalElements, setTotalElements] = useState(0);

  const fetchBlogs = useCallback( async () => {
    try {
      // setLoading(true);
      const response = await apiClient.get('/blogposts', {
        params: {
          pageNo: pageNo,
          pageSize: pageSize,
          sortBy: sortBy,
          sortDir: sortDir,
          keyword: keyword || undefined
        }
      }); // invoke REST API asynchronously, returns a promise
      console.log("all blogs: " + JSON.stringify(response.data.content, null, 2)) // Axios GET request to fetch blogs
      // const sortedBlogs = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort blogs by createdAt in descending order
      setBlogs(response.data.content); // Assuming the response data is an array of blog posts
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      console.error("Error fetching blogs:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      setError(
        error.response?.data?.message ||
        "Failed to fetch blogs. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  },
    [pageNo, pageSize, sortBy, sortDir, keyword]
  );
  
  useEffect(() => {fetchBlogs();}, [fetchBlogs]);

  // Debounced search input
  const[searchText, setSearchText] = useState('');
  useEffect(() => {
    const id = setTimeout(() => {
      setPageNo(1);
      setKeyword(searchText.trim());
    }, 400);
    return () => clearTimeout(id);
  }, [searchText]);

  function openBlogFormForAddingNewBlog() {
  setIsAddingNewBlog(true);
  setIsEditingBlog(false);
  }
  
  function addBlogHandler(blogData) {
    const newBlog = {
      ...blogData,
    };
    setBlogs((existingBlogs) => [newBlog, ...existingBlogs]);
  }

  function openBlogFormForEditing(id) {
    const blogById = blogs.find((blog) => blog.id === id);
    if (blogById) {
      setBlogToEdit(blogById);
      setIsEditingBlog(true);
      setIsAddingNewBlog(false);
    }
  }

  function editBlogHandler(updatedBlog) {
    setBlogs((previousBlogs) =>
      previousBlogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    );
    }
    
    function hideModalHandler() {
      setIsAddingNewBlog(false);
      setIsEditingBlog(false);
      setBlogToEdit(null);
    }

    const deleteBlog = async (id) => {
    try {
      const response = await apiClient.delete(`/blogposts/${id}`);

      if (response.status === 204) {
        // setBlogs((previousBlogs) => previousBlogs.filter((blog) => blog.id !== id));
        fetchBlogs();
      }

      console.log(response.data);

    } catch (error) {
      console.error("Error deleting blog:", error);
    }
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
            <h2>ALL BLOGS</h2>
        </div>

        <div className={classes.actions}>
          <button className={classes.button} onClick={openBlogFormForAddingNewBlog}>Add New Blog</button>
        </div>

        <div className={classes.toolbar}>
          <input
            className={classes.search}
            type='text'
            placeholder="Search blog"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          >
          </input>

          <div className={classes.pager}>
            <button className={classes.pageBtn} disabled={pageNo <= 1} onClick={() => setPageNo(p => p-1)}>Prev</button>
            <span className={classes.pageInfo}>Page {pageNo}</span>
            <button className={classes.pageBtn} disabled={pageNo >= totalPages} onClick={() => setPageNo(p => p + 1)}>Next</button>
          </div>

          <div className={classes.pageSizeBox}>
            <label>Per page:</label>
            <select value={pageSize} onChange={(e) => {setPageNo(1); setPageSize(e.target.value)}}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
          
          <div className={classes.pager}>
            <select value={sortBy} onChange={(e) => {setPageNo(1); setSortBy(e.target.value)}}>
              <option value="createdAt">Created</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>

            <select value={sortDir} onChange={(e) => {setPageNo(1); setSortDir(e.target.value)}}>
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>

          <span>Total Blogs: {totalElements}</span>
        </div>

        <Routes>
          <Route index element={<BlogsList 
                                  blogs={blogs} 
                                  onAddBlog={addBlogHandler} 
                                  isAddingNewBlog={isAddingNewBlog}
                                  onStopAddingNewBlog={hideModalHandler}
                                  onDeleteBlog={deleteBlog}
                                  blogToEdit={blogToEdit}
                                  onEditBlog={openBlogFormForEditing}
                                  onEditedBlog={editBlogHandler}
                                  isEditingBlog={isEditingBlog}
                                  onStopEditingBLog={hideModalHandler}/>
                                }>
          </Route>
          <Route path=":id" element={<FullBlog blogs={blogs} />}></Route>
        </Routes>
      </>
    );
}

export default BlogsPage