import { Link } from 'react-router-dom'
import classes from './BlogCard.module.css'

function BlogCard({ id, title, content, onDeleteBlog }) {
  return (
    <li className={classes.blogcard}>
      <h3>Blog Post #{id}</h3>
      <Link to={`/blogs/${id}`}>
        <h3 className={classes.text}>{title}</h3>
      </Link>
      <p className={classes.text}>{content}</p>
      <Link to={`/blogs/${id}`}>Read More</Link>
      <button onClick = {() => onDeleteBlog(id)}>
        Delete
      </button>
    </li>

  )
}

export default BlogCard