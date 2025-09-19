import { Link } from 'react-router-dom'
import classes from './BlogCard.module.css'
import { useState } from "react";


function BlogCard({ id, title, author, content, onDeleteBlog, onEditBlog }) {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleContent() {
    setIsExpanded(prev => !prev); 
  }

  return (
    <li className={classes.blogcard}>
      <div>
        <span>
        <button className={classes.buttonEdit} onClick = {() => onEditBlog(id)}>
          Edit
        </button>
        <h2>Blog Post #{id}</h2>
        </span>
      </div>
      
      <Link to={`/blogs/${id}`}>
        <h3 className={classes.text}>{title}</h3>
      </Link>
      <h4>Author: {author}</h4>

      {content.length > 200 ? (
          <p className={classes.text}>
            {isExpanded ? content : `${content.substring(0, 200)}...`}
          </p>
        ) : (
          <p className={classes.text}>
            {content}
          </p>
        )}

      <button className={classes.buttonReadMore} onClick={toggleContent}>{isExpanded ? 'Show Less' : 'Read More'}</button>
      <div className={classes.actions}>
        <button className={classes.button} onClick = {() => onDeleteBlog(id)}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default BlogCard