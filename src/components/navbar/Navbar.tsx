import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleOnCloseSidebar() {
    setIsSidebarOpen(false);
  }

  useEffect(() => {
    document.addEventListener("click", handleOnCloseSidebar);

    return () => document.removeEventListener("click", handleOnCloseSidebar);
  }, []);

  return (
    <div className="navbar">
      <GiHamburgerMenu
        className="navbar__hamburger"
        onClick={(e) => {
          e.stopPropagation();
          setIsSidebarOpen(!isSidebarOpen);
        }}
      />
      <Link to="/" className="navbar__icon">
        <span className="navbar__text">The</span>
        <h4>Trailers</h4>
      </Link>
      <div
        className={`navbar__links ${
          isSidebarOpen
            ? "u__animation--sidebar-open"
            : "u__animation--sidebar-close"
        }`}
      >
        <Link to="/movies" className="navbar__link">
          Movies
        </Link>
        <Link to="/tv-shows" className="navbar__link">
          TV Shows
        </Link>
      </div>
      <div className="navbar__search">
        <input
          type="text"
          className="navbar__input"
          placeholder="Search for a movie"
        />
        <FiSearch className="navbar__magnifying-glass" />
      </div>
    </div>
  );
}

export default Navbar;
