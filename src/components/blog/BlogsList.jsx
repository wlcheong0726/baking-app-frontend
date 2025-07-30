import BlogCard from './BlogCard'
import Modal from '../common/Modal'
import BlogForm from './BlogForm'
import classes from './BlogsList.module.css'
import { useState } from 'react'

function BlogsList({ isAddingNewBlog, onStopAddingNewBlog}) {
  const[blogs, setBlogs] = useState([]);

  function addBlogHandler(blogData) {
    setBlogs((existingBlogs) => [blogData, ...existingBlogs]);
  }



  // Sibling elements not allowed in return method
  return (
    <>
      {isAddingNewBlog && (
        <Modal onClose={onStopAddingNewBlog}>
          <BlogForm 
            onCancel={onStopAddingNewBlog}
            onAddBlog={addBlogHandler}
          />
        </Modal>
      )}
      {blogs.length > 0 && (
              <ul className={classes.blogs}>
        {/* {blogs.map(blog => (
          <BlogCard 
            key={blog.id} 
            id={blog.id} 
            title={blog.title} 
            content={blog.content}
          />
        ))} */}

        {
          blogs.map((blog) => <BlogCard key={blog.content} title={blog.title} content={blog.content}/>)
        }
      </ul>
      )}

      {blogs.length === 0 && (
        <div style={{ textAlign: 'center', color: 'white'}}>
          <h2>There are no blogs yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}

    </>
  )
}

export default BlogsList