import BlogCard from './BlogCard'
import Modal from '../common/Modal'
import BlogForm from './BlogForm'
import classes from './BlogsList.module.css'

function BlogsList({ blogs, isAddingNewBlog, onAddBlog, onStopAddingNewBlog, onDeleteBlog, blogToEdit, isEditingBlog, onStopEditingBLog, onEditBlog, onEditedBlog }) {
  

  // Sibling elements not allowed in return method
  return (
    <>
      {isAddingNewBlog && (
        <Modal onClose={onStopAddingNewBlog}>
          <BlogForm 
            onCancel={onStopAddingNewBlog}
            onAddBlog={onAddBlog}
          />
        </Modal>
      )}

      {isEditingBlog && (
        <Modal onClose={onStopEditingBLog}>
          <BlogForm 
            blogToEdit={blogToEdit}
            onCancel={onStopEditingBLog}
            onEditBlog={onEditBlog}
            onEditedBlog={onEditedBlog}
          />
        </Modal>
      )}

      {blogs.length > 0 && (
        <ul className={classes.blogs}>
          {
            blogs.map((blog) => <BlogCard key={blog.id} id={blog.id} title={blog.title} content={blog.content} author={blog.author} imageUrl={blog.imageUrl} onDeleteBlog={onDeleteBlog} onEditBlog={onEditBlog}/>)
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