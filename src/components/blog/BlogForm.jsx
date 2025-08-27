import { useState } from 'react';
import classes from './BlogForm.module.css'

function BlogForm({ onCancel, onAddBlog }) {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredContent, setEnteredContent] = useState('');

  function titleChangeHandler(event) {
    setEnteredTitle(event.target.value);
  }

  function contentChangeHandler(event) {
    setEnteredContent(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const blogData = {
      title: enteredTitle,
      content: enteredContent
    }
    console.log(blogData);
    onAddBlog(blogData);
    onCancel();
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h1>Create New Blog</h1>
      <div>
        <label htmlFor="title" className={classes.label}>Title</label>
        <textarea id="title" rows={1} onChange={titleChangeHandler}></textarea>
      </div>
      <div>
        <label htmlFor="content" className={classes.label}>Content</label>
        <textarea id="title" rows={6} className={classes.textarea} onChange={contentChangeHandler}></textarea>
      </div>

      <div className={classes.actions}>
        <button className={classes.button}>
          Submit
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>

    </form>
  )
}

export default BlogForm