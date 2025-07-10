import { Link } from 'react-router-dom'

function BlogCard( {title, id} ) {
  return (
    <div>
      <h3>{id}</h3>
      <h3>{title}</h3>
      <Link to={`/blogs/${id}`}>Read More</Link>
    </div>

  )
}

export default BlogCard