import BlogCard from "../components/blog/BlogCard";

function BlogsPage() {
    const mockBlogs = [
      {id: 1, title: 'My First Bake'},
      {id: 2, title: 'Basque Burnt Cheesecake!'}
    ]
    return (
        <div>
            <h1>ALL BLOGS</h1>
            <div>
              {mockBlogs.map(blog => (<BlogCard key={blog.id} title={blog.title} />))}
            </div>
        </div>
    );
}

export default BlogsPage