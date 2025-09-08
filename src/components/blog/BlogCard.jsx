import { Link } from 'react-router-dom'
import classes from './BlogCard.module.css'

function BlogCard({ id, title, author, content, onDeleteBlog, onEditBlog }) {
  return (
    <li className={classes.blogcard}>
      <h2>Blog Post #{id}</h2>
      <button onClick = {() => onEditBlog(id)}>
        Edit
      </button>
      <Link to={`/blogs/${id}`}>
        <h3 className={classes.text}>{title}</h3>
      </Link>
      <h4>Author: {author}</h4>
      <p className={classes.text}>{content}</p>
      <Link to={`/blogs/${id}`}>Read More</Link>
      <button onClick = {() => onDeleteBlog(id)}>
        Delete
      </button>
    </li>
  )
}

export default BlogCard