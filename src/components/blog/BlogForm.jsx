import { useEffect, useRef, useState } from 'react';
import apiClient from '../../api/apiClient';

function BlogForm({ onCancel, onAddBlog, blogToEdit, onEditedBlog }) {
  const [formData, setFormData] = useState(() => ({
    title: blogToEdit?.title || '',
    author: blogToEdit?.author || '',
    content: blogToEdit?.content || '',
  }));
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (blogToEdit && blogToEdit.imageUrl != null) {
      setImagePreview(blogToEdit.imageUrl);
      console.log(blogToEdit)
    }
  }, [blogToEdit])

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
      if (error.response?.status === 400)
      console.log('Error creating blog: ', error);
      alert('Failed to create blog. Please try again.');
    }
  }

  const editBlog = async (event) => {
    event.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('content', formData.content);
      console.log("edit form - imageurl = " + blogToEdit.imageUrl);
      console.log("edit form - imagepreview = " + imagePreview);

      /**
       * Scenario 1: 
       * initially have pic uploaded
       * 1. keep same pic 2. delete pic** 3. change pic**
       *
       * Scenario 2: 
       * initially no pic uploaded
       * 1. keep same 2. add pic**
       */
      if (imagePreview !== blogToEdit.imageUrl && selectedImage) {
        formDataToSend.append('imageFile', selectedImage); // Scenario 1.3 and scenario 2.2: initially have pic then change & initially no pic and add new pic
        console.log("edit blog: image change");
      } else if (imagePreview && imagePreview == blogToEdit.imageUrl && !selectedImage) {
        // Scenario 1.1: initially have pic uploaded + keep same pic
        formDataToSend.append('imageUrl', blogToEdit.imageUrl);
        console.log("edit blog: image kept the same");
      }

      // For scenarios 1.1 and 2.1 - both end up not having picture, hence formDataToSend will not have key value pair to indicate to backend of this.
      // console.log('edit form data selected image: ' + selectedImage);
      // console.log('edit form data imagepreview: ' + imagePreview);
      // console.log('Sending edit form data: ', formDataToSend);

      const response = await apiClient.put(`/blogposts/blogpost/${blogToEdit.id}`, formDataToSend);
      console.log('Blog updated: ', response.data);
      onEditedBlog(response.data); // Pass the updated blog to parent component
      onCancel(); // Close the form modal after successful update
    } catch (error) {
      console.log('Error updating blog: ', error);
      alert('Failed to update blog. Please try again.');
    }
  }

  return (
    <form
      className="bg-[#6233b9] p-4 w-[40rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg text-center"
      onSubmit={blogToEdit ? editBlog : createBlog}
    >

      {/* Form title changes based on add/edit mode */}
      <h1 className="text-center text-white mb-8 text-3xl font-semibold">
        {blogToEdit ? 'Edit Blog' : 'Create New Blog'}
      </h1>

      {/* Blog Title Input */}
      <div>
        <label htmlFor="title" className="block mb-1 text-[#eadbfb] font-bold text-sm uppercase tracking-wide">Title</label>
        <textarea
          id="title"
          name="title"
          value={formData.title}
          rows={1}
          onChange={formDataChangeHandler}
          className="w-full p-2 rounded-md border-0 bg-[#c4a9e4] text-[#28262c] font-sans resize-none"
        ></textarea>
      </div>

      {/* Blog Author Input */}
      <div>
        <label htmlFor="author" className="block mb-1 text-[#eadbfb] font-bold text-sm uppercase tracking-wide mt-4">Author</label>
        <textarea
          id="author"
          name="author"
          value={formData.author}
          rows={1}
          onChange={formDataChangeHandler}
          className="w-full p-2 rounded-md border-0 bg-[#c4a9e4] text-[#28262c] font-sans resize-none"
        ></textarea>
      </div>

      {/* Image Upload Block */}
      <div >
          {/* Label stays outside the styled block */}
          <label htmlFor="image" className="block mb-1 text-[#eadbfb] font-bold text-sm uppercase tracking-wide mt-4">Image (Optional)</label>

           {/* Styled container for upload UI */}
          <div className="bg-[#c4a9e4] p-4 rounded-lg">

            {/* Upload Button + Hidden Input */}
            <div className="flex justify-center mt-2">
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="hidden"
              />
              <label 
                htmlFor="image" 
                className="inline-block py-1 px-4 bg-[#34036c] text-[#e5d5f7] rounded cursor-pointer text-sm font-medium hover:bg-[#23014a] transition-colors">
                  Choose Image
              </label>
            </div>

            {/* Conditional: Image Preview + Remove Button */}
            {imagePreview && (
              <div className="flex flex-col items-center mt-2">
                <img src={imagePreview} className="max-w-[200px] mt-2 rounded-md" />
                <button
                  type="button"
                  onClick={removeSelectedImage}
                  className="cursor-pointer text-xs py-1 px-4 rounded bg-[#a774e0] text-[#e5d5f7] border-0 mt-2 hover:bg-[#a262eb] transition-colors"
                >
                  Remove Image
                </button>
              </div>
            )}

          </div>
      </div>
      
      {/* Blog Content Input */}
      <div>
        <label htmlFor="content" className="block mb-1 text-[#eadbfb] font-bold text-sm uppercase tracking-wide mt-4">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          rows={6}
          className="w-full p-2 rounded-md border-0 bg-[#c4a9e4] text-[#28262c] font-sans"
          onChange={formDataChangeHandler}
        ></textarea>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 mt-6">
        <button
          type="submit"
          className="cursor-pointer font-semibold py-2 px-6 rounded bg-[#34036c] text-[#e5d5f7] border-0 hover:bg-[#23014a] transition-colors"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer font-semibold py-2 px-6 rounded border-0 text-[#e5d5f7] hover:text-[#d1bee6] transition-colors"
        >
          Cancel
        </button>
      </div>

    </form>
  )
}

export default BlogForm
