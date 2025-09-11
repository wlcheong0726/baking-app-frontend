import { useState } from 'react';
import classes from './BlogForm.module.css'
import apiClient from '../../api/apiClient';

function BlogForm({ onCancel, onAddBlog, blogToEdit, onEditedBlog }) {
  let defaultFormData;

  if (blogToEdit) {
    defaultFormData = {
      title: blogToEdit.title,
      author: blogToEdit.author,
      content: blogToEdit.content
    };
  } else {
    defaultFormData = {
      title: '',
      author: '',
      content: ''
    };
  }

  const [formData, setFormData] = useState(defaultFormData);

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
      onAddBlog(response.data); // Pass the newly created blog to parent component
      onCancel(); // Close the form modal after successful creation

    } catch (error) {
      console.log('Error creating blog: ', error);
      alert('Failed to create blog. Please try again.');
    }
  }

  const editBlog = async (event) => {
    event.preventDefault();
    try {
      const response = await apiClient.put(`/blogposts/blogpost/${blogToEdit.id}`, formData);
      console.log('Blog updated: ', response.data);
      onEditedBlog(response.data); // Pass the updated blog to parent component
      onCancel(); // Close the form modal after successful update
    } catch (error) {
      console.log('Error updating blog: ', error);
      alert('Failed to update blog. Please try again.');
    }
  }

  return (
    <form className={classes.form} onSubmit={blogToEdit ? editBlog : createBlog}>
      <h1>{blogToEdit ? 'Edit Blog' : 'Create New Blog'}</h1>
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