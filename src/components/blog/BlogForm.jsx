import { useState } from 'react';
import classes from './BlogForm.module.css'
import apiClient from '../../api/apiClient';

function BlogForm({ onCancel }) {
  // const [enteredTitle, setEnteredTitle] = useState('');
  // const [enteredContent, setEnteredContent] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: ''
  });


  // function titleChangeHandler(event) {
  //   setEnteredTitle(event.target.value);
  // }

  // function contentChangeHandler(event) {
  //   setEnteredContent(event.target.value);
  // }

  function formDataChangeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const createBlog = async (event) => {
    event.preventDefault();
    try {
      const response = await apiClient.post('/blogposts', formData);
      console.log('Blog created: ', response.data);

    } catch (error) {
      console.log('Error creating blog: ', error);
    }
  }

  // function submitHandler(event) {
  //   event.preventDefault();
  //   const blogData = {
  //     title: enteredTitle,
  //     content: enteredContent
  //   }
  //   console.log(blogData);
  //   onAddBlog(blogData);
  //   onCancel();
  // }

  return (
    <form className={classes.form} onSubmit={createBlog}>
      <h1>Create New Blog</h1>
      <div>
        <label htmlFor="title" className={classes.label}>Title</label>
        <textarea id="title" name="title" value = {formData.title} rows={1} onChange={formDataChangeHandler}></textarea>
      </div>
      <div>
        <label htmlFor="author" className={classes.label}>Author</label>
        <textarea id="author" name="author" value = {formData.author} rows={1} onChange={formDataChangeHandler}></textarea>
      </div>
      <div>
        <label htmlFor="content" className={classes.label}>Content</label>
        <textarea id="content" name="content" value = {formData.content} rows={6} className={classes.textarea} onChange={formDataChangeHandler}></textarea>
      </div>

      <div className={classes.actions}>
        <button type="submit" className={classes.button}>
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