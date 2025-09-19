import { Link, useParams } from "react-router-dom"; 
import classes from './FullBlog.module.css'

function FullBlog( {blogs} ) {
  const { id } = useParams(); // Get blog ID from URL
  const blog = blogs.find(blog => blog.id.toString() === id); // Match ID

  if (!blog) {
    return <p>Blog not found.</p>
  }

  return (
    <>
      <Link to="/blogs" className={classes.backLink}>{"< Back to Blogs"}</Link>
      <div className={classes.fullblog}>
        <h1>FullBlog #{blog.id}</h1>
        <h3 className={classes.title}>{blog.title}</h3>
        <p className={classes.text}>{blog.content}</p>
      </div>
    </>
  )
}

export default FullBlog