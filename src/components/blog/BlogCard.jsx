function BlogCard( {title, id} ) {
  return (
    <div>
      <h3>{id}</h3>
      <h3>{title}</h3>
      <button>Read More</button>
    </div>

  )
}

export default BlogCard