import { Link } from 'react-router-dom'
import classes from './BlogCard.module.css'

function BlogCard({ id, title, content }) {
  return (
    <li className={classes.blogcard}>
      <div>
        <h3>Blog Post #{id}</h3>
        <button className={classes.actions.button}>Edit</button>
      </div>
      <Link to={`/blogs/${id}`}>
        <h3 className={classes.text}>{title}</h3>
      </Link>
      <p className={classes.text}>{content}</p>
      <Link to={`/blogs/${id}`}>Read More</Link>
    </li>
  )
}

export default BlogCard