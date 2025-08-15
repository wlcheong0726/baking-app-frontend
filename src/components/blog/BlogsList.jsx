import BlogCard from './BlogCard'
import Modal from '../common/Modal'
import BlogForm from './BlogForm'
import classes from './BlogsList.module.css'

function BlogsList({ blogs, isAddingNewBlog, onStopAddingNewBlog}) {
  

  // Sibling elements not allowed in return method
  return (
    <>
      {isAddingNewBlog && (
        <Modal onClose={onStopAddingNewBlog}>
          <BlogForm 
            onCancel={onStopAddingNewBlog}
            // onAddBlog={onAddBlog}
          />
        </Modal>
      )}
      {blogs.length > 0 && (
        <ul className={classes.blogs}>
          {
            blogs.map((blog) => <BlogCard key={blog.id} id={blog.id} title={blog.title} content={blog.content}/>)
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