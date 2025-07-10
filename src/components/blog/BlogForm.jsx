import classes from './BlogForm.module.css'

function BlogForm() {
  return (
    <form className={classes.form}>
      <h1>Create New Blog</h1>
      <div>
        <label htmlFor="title" className={classes.label}>Title</label>
        <textarea rows={1}></textarea>
      </div>
      <div>
        <label className={classes.label}>Content</label>
        <textarea rows={6} className={classes.textarea}></textarea>
      </div>

      <div className={classes.actions}>
        <button className={classes.button}>
          Submit
        </button>
        <button>
          Cancel
        </button>
      </div>

    </form>
  )
}

export default BlogForm