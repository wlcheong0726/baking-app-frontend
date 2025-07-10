import BlogsList from "../components/blog/BlogsList";
import Modal from "../components/common/Modal";
import BlogForm from "../components/blog/BlogForm";
import { useState } from "react";

function BlogsPage() {
    const mockBlogs = [
      {id: 1, title: 'My First Bake', content: 'Today I baked my first cake. It was a strawberry shortcake. It took me 3 hours to make.'},
      {id: 2, title: 'Basque Burnt Cheesecake!', content: 'I tried to bake a Basque Burnt Cheesecake today. It is a Spanish cake originated from San Sebastian.'}
    ]

    const [ modalIsVisible, setModalIsVisible ] = useState(false);
    
    function hideModalHandler() {
      setModalIsVisible(false);
    }

    function showModalHandler() {
      setModalIsVisible(true);
    }
    
    return (
      <>
        <div>
            <h1>ALL BLOGS</h1>
        </div>
        <div>
          <button onClick={showModalHandler}>Add New Blog</button>
        </div>
        <div>
            <BlogsList blogs={mockBlogs} isAddingNewBlog={modalIsVisible} onStopAddingNewBlog={hideModalHandler}/>
        </div>
      </>
    );
}

export default BlogsPage