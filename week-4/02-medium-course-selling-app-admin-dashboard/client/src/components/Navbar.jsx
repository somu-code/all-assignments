import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <header className="">
      <nav className="flex flex-row justify-between items-center font-medium px-6 py-3">
        <Link to="/">
          <div className="text-[#1E0E62] text-2xl font-bold">Coursera</div>
        </Link>
        <div className="flex flex-row items-center gap-4">
          <Link to="/">
            <div className="">Home</div>
          </Link>
          <Link to="/admin/courses">
            <div className="">Courses</div>
          </Link>
          <Link to="/admin/add-course">
            <div className="">Add-Course</div>
          </Link>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Link to="/admin/signup">
            <button className="text-[#151439] text-lg">Sign Up</button>
          </Link>
          <Link to="/admin/signin">
            <div className="bg-[#25DAC5] px-3 py-1 rounded-full">
              <button className="text-[#FFFFFF] text-lg font-semibold text-center">
                Sign In
              </button>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
