import BlogCard from './BlogCard'
import Modal from '../common/Modal'
import BlogForm from './BlogForm'
import classes from './BlogsList.module.css'
import { useState } from 'react'

function BlogsList({ blogs, isAddingNewBlog, onStopAddingNewBlog}) {
  // const [ modalIsVisible, setModalIsVisible ] = useState(true);

  // function hideModalHandler() {
  //   setModalIsVisible(false);
  // }

  return (
    <>
      {isAddingNewBlog && (
        <Modal onClose={onStopAddingNewBlog}>
          <BlogForm />
        </Modal>
      )}
      
      <ul className={classes.blogs}>
        {blogs.map(blog => (
          <BlogCard 
            key={blog.id} 
            id={blog.id} 
            title={blog.title} 
            content={blog.content}
          />
        ))}
      </ul>
    </>
  )
}

export default BlogsList