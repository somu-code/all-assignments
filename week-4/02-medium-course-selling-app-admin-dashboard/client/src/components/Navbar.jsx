import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav className="flex flex-row justify-between items-center font-medium px-4 pt-3">
        <Link to="/">
          <div className="">Coursera</div>
        </Link>
        <div className="flex flex-row items-center gap-4">
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/signin">
            <button>Sign In</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
