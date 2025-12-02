import { Link } from 'react-router-dom'

function NavBar() {
    return (
      <nav className="text-center text-xl font-bold border-2">
        <div className="flex justify-center gap-2 m-2">
          <Link to="/">Home</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/recipes">Recipes</Link>
        </div>
    </nav>
    );
}

export default NavBar;