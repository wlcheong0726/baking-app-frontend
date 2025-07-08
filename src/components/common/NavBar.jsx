import { Link } from 'react-router-dom'

function NavBar() {
    return (
      <nav>
        <h1>WENG'S BAKING ZONE</h1>
        <Link to="/">Home</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/recipes">Recipes</Link>
      </nav>
    );
}

export default NavBar;