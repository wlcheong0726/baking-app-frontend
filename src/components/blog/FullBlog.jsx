import { Link, useParams } from "react-router-dom"; 

function FullBlog( {blogs} ) {
  const { id } = useParams(); // Get blog ID from URL
  const blog = blogs.find(blog => blog.id.toString() === id); // Match ID

  if (!blog) {
    return <p>Blog not found.</p>
  }

  return (
    <div className="max-w-4xl my-4 mx-auto p-4">
      <Link to="/blogs" className="block w-full text-right mb-4 text-[#957fd4] underline underline-offset-4 hover:text-[#b6a1f1] transition-colors">
        {"< Back to Blogs"}
      </Link>
      <div className="my-4 p-8 bg-[#9c7eee] rounded-lg shadow-md overflow-hidden animate-blog-card">
        <h1 className="text-2xl font-semibold text-[#34036c] text-right">FullBlog #{blog.id}</h1>

        {/* Blog Title*/}
        <h3 className="whitespace-pre-wrap text-3xl font-bold underline mt-1 text-[#593884] italic text-center">{blog.title}</h3>
        
        {/* Author Name */}
        <h4 className="m-4 text-l font-bold uppercase text-[#d0bbec] text-center">Author: {blog.author}</h4>

        {/* Blog Image */}
        {blog.imageUrl && (
          <img src={blog.imageUrl} alt={blog.title} className="max-w-[50%] h-auto mb-4 rounded-lg " />
        )}

        {/* Blog Content with Read More / Show Less Functionality */}
        <div className="border rounded-sm border-[#34036c] p-4 bg-[#e5d5f7]">
          <p className="whitespace-pre-wrap text-xl mt-2 text-[#593884] italic">{blog.content}</p>
        </div>
      </div>
    </div>
  )
}

export default FullBlog
