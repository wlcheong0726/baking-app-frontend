import { useParams } from "react-router-dom"; 

function FullBlog( {blogs} ) {
  const { id } = useParams(); // Get blog ID from URL
  const blog = blogs.find(blog => blog.id.toString() === id); // Match ID

  if (!blog) {
    return <p>Blog not found.</p>
  }

  return (
    <>
      <h1>FullBlog #{blog.id}</h1>
      <h3 >{blog.title}</h3>
      <p>{blog.content}</p>
    </>
  )
}

export default FullBlog