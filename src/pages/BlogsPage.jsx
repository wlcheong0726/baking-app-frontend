import BlogsList from "../components/blog/BlogsList";
import FullBlog from '../components/blog/FullBlog';

import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import apiClient from "../api/apiClient";
import { FaSearch } from "react-icons/fa";

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
        fetchBlogs();
      }

      console.log(response.data);

    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  }
    
    return (
      <>
        <div>
            <h2 className="text-3xl font-bold underline text-center">BLOGS PAGE</h2>
        </div>

        {/* Add New Blog Button */}
        <div className="flex gap-2 justify-center m-4">
          <button
            className="rounded bg-[#34036c] px-6 py-2 font-medium text-[#e5d5f7] transition-colors hover:bg-[#4a0b99]"
            onClick={openBlogFormForAddingNewBlog}
          >
            Add New Blog
          </button>
        </div>

        {/* Search, Pagination and Sorting Controls */}
        <div className="mt-3 mb-4 flex w-full flex-col flex-wrap items-center gap-3">

          {/* Search Input */}
          <div className="flex w-full justify-center">
            <div className="flex w-1/2 min-w-[260px] items-center gap-2 rounded-md border border-[#d7d7d7] bg-white px-2.5 py-2 shadow-[0_0_8px_#ddd]">
              <FaSearch className="text-gray-500" />
              <input
                className="h-9 w-full rounded-md border border-[#d7d7d7] text-purple-500 px-2.5 py-2 text-base focus:outline-none"
                type='text'
                placeholder="Search blog"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          {/* Pagination and Sorting Controls */}
          <div className="flex items-center gap-4">

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button
                className="rounded-md border border-[#d7d7d7] bg-white px-2.5 py-1.5 text-sm font-medium text-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={pageNo <= 1}
                onClick={() => setPageNo(p => p-1)}
              >
                Prev
              </button>
              <span className="text-[0.95rem] font-semibold text-white">Page {pageNo}</span>
              <button
                className="rounded-md border border-[#d7d7d7] bg-white px-2.5 py-1.5 text-sm font-medium text-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={pageNo >= totalPages}
                onClick={() => setPageNo(p => p + 1)}
              >
                Next
              </button>
            </div>
            
            {/* Sorting Controls */}
            <div className="flex items-center gap-4"> {/* Between Per Page Controls & Sort Controls */}

              <div className="flex items-center gap-2"> {/* Between Per Page & Select */}
                <label className="font-semibold">Per page:</label>
                <select
                  className="rounded-md border border-[#d7d7d7] bg-white px-2 py-1 text-purple-500"
                  value={pageSize}
                  onChange={(e) => {setPageNo(1); setPageSize(e.target.value)}}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
              
              <div className="flex items-center gap-4">
                <select
                  className="rounded-md border border-[#d7d7d7] bg-white px-2 py-1 text-purple-500"
                  value={sortBy}
                  onChange={(e) => {setPageNo(1); setSortBy(e.target.value)}}
                >
                  <option value="createdAt">Created</option>
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                </select>

                <select
                  className="rounded-md border border-[#d7d7d7] bg-white px-2 py-1 text-purple-500"
                  value={sortDir}
                  onChange={(e) => {setPageNo(1); setSortDir(e.target.value)}}
                >
                  <option value="desc">Desc</option>
                  <option value="asc">Asc</option>
                </select>
              </div>
            </div>

            
          </div>
        </div>

        <h4 className="text-center">Total Blogs: {totalElements}</h4>


        {/* Show loading or error message inside the layout */}
        {loading && <p className="text-center">Loading blogs...</p>}
        {error && <p className="text-center">Error: {error}</p>}

        {/* Only show BlogsList if not loading and no error */}
        <div className="flex justify-center">
          {!loading && !error && (
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
          )}
        </div>
        
      </>
    );
}

export default BlogsPage
