import { useRef, useState } from 'react';
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // ref for file input
  const fileInputRef = useRef(null);

  function formDataChangeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  // Handle image selection with validation
  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          alert('Image file size should be less than 5MB.');
          return;
        }
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
        console.log(file);
        console.log(URL.createObjectURL(file));
      } else {
        alert('Please select a valid image file (e.g., .jpg, .png).');
      }
    }
  }

  // Cleanup preview URL
  function cleanupImagePreview() {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
      setSelectedImage(null);

      // Clear native input so filename disappears
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  function removeSelectedImage() {
    cleanupImagePreview();
  }

  const createBlog = async (event) => {
    event.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('content', formData.content);

      if (selectedImage) {
        formDataToSend.append('imageFile', selectedImage);
      }

      console.log('Sending form data: ', formDataToSend);

      const response = await apiClient.post('/blogposts', formDataToSend);
      console.log('Blog created: ', response.data);
      onAddBlog(response.data); // Pass the newly created blog to parent component
      cleanupImagePreview();
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

      {/* Form title changes based on add/edit mode */}
      <h1 className={classes.h1}>{blogToEdit ? 'Edit Blog' : 'Create New Blog'}</h1>

      {/* Blog Title Input */}
      <div>
        <label htmlFor="title" className={classes.label}>Title</label>
        <textarea id="title" name="title" value = {formData.title} rows={1} onChange={formDataChangeHandler}></textarea>
      </div>

      {/* Blog Author Input */}
      <div>
        <label htmlFor="author" className={classes.label}>Author</label>
        <textarea id="author" name="author" value = {formData.author} rows={1} onChange={formDataChangeHandler}></textarea>
      </div>

      {/* Image Upload Block */}
      <div >
          {/* Label stays outside the styled block */}
          <label htmlFor="image" className={classes.label}>Image (Optional)</label>

           {/* Styled container for upload UI */}
          <div className={classes.imageUploadSection}>

            {/* Upload Button + Hidden Input */}
            <div className={classes.imageUploadInputWrapper}>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className={classes.hiddenFileInput}
              />
              <label 
                htmlFor="image" 
                className={classes.uploadButton}>
                  Choose Image
              </label>
            </div>

            {/* Conditional: Image Preview + Remove Button */}
            {imagePreview && (
              <div className={classes.imagePreviewContainer}>
                <img src={imagePreview} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />
                <button type="button" onClick={removeSelectedImage} className={classes.buttonRemoveImage}>
                  Remove Image
                </button>
              </div>
            )}
          </div>
      </div>
      
      {/* Blog Content Input */}
      <div>
        <label htmlFor="content" className={classes.label}>Content</label>
        <textarea id="content" name="content" value = {formData.content} rows={6} className={classes.textarea} onChange={formDataChangeHandler}></textarea>
      </div>

      {/* Action Buttons */}
      <div className={classes.actions}>
        <button type="submit" className={classes.button}>Submit</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>

    </form>
  )
}

export default BlogForm