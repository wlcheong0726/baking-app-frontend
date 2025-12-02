import { Link } from 'react-router-dom'
import { useState } from "react";


function BlogCard({ id, title, author, content, imageUrl, onDeleteBlog, onEditBlog }) {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleContent() {
    setIsExpanded(prev => !prev); 
  }

  return (
    <li className="my-4 p-8 bg-[#9c7eee] rounded-lg shadow-md overflow-hidden animate-blog-card flex flex-col">

      {/* Edit Button & Blog Post ID */}
      <div className="flex items-start justify-between gap-4">

        {/* Edit Button */}
        <button
          type="button"
          className="cursor-pointer text-base py-2 px-5 rounded bg-[#8e5aca] text-[#e5d5f7] border-0 hover:bg-[#7b49b5] transition-colors"
          onClick={() => onEditBlog(id)}
        >
          Edit
        </button>

        {/* Blog Post ID */}
        <h3 className="text-2xl font-semibold text-[#34036c]">Blog Post #{id}</h3>
      </div>
      
      {/* Title with Link to Blog Details Page */}
      <Link to={`/blogs/${id}`}>
        <h2 className="whitespace-pre-wrap text-3xl font-bold underline mt-1 text-[#593884] italic text-center">{title}</h2>
      </Link>

      {/* Author Name */}
      <h4 className="m-4 text-l font-bold uppercase text-[#d0bbec] text-center">Author: {author}</h4>

      {/* Blog Image */}
      {imageUrl && (
        <img src={imageUrl} alt={title} className="max-w-[50%] h-auto mb-4 rounded-lg " />
      )}

      {/* Blog Content with Read More / Show Less Functionality */}
      <div className="border rounded-sm border-[#34036c] p-4 bg-[#e5d5f7]">
        {content.length > 200 ? (
          <p className="whitespace-pre-wrap text-xl mt-1 text-[#593884] italic text-center">
            {isExpanded ? content : `${content.substring(0, 200)}...`}
          </p>
        ) : (
          <p className="whitespace-pre-wrap text-xl mt-1 text-[#593884] italic text-center">
            {content}
          </p>
        )}

       {content.length > 200 && (
        <button
          type="button"
          className="cursor-pointer text-base py-2 px-5 rounded bg-[#8e5aca] text-[#e5d5f7] m-4 border-0 hover:bg-[#7b49b5] transition-colors"
          onClick={toggleContent}
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
        )}
      </div>

      
       
      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="cursor-pointer text-base mt-4 py-2 px-6 rounded bg-[#34036c] text-[#e5d5f7] border-0 hover:bg-[#23014a] transition-colors"
          onClick={() => onDeleteBlog(id)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default BlogCard
