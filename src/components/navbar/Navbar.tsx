import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";

function Navbar() {
  const [sidebarStatus, setSidebarStatus] = useState("");

  function handleOnCloseSidebar() {
    if (sidebarStatus === "open") {
      setSidebarStatus("close");
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleOnCloseSidebar);

    return () => document.removeEventListener("click", handleOnCloseSidebar);
  }, [sidebarStatus]);

  useEffect(() => {
    if (sidebarStatus === "open") {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "visible";
      };
    }
  }, [sidebarStatus]);

  return (
    <div className="navbar">
      <GiHamburgerMenu
        className="navbar__hamburger"
        onClick={(e) => {
          e.stopPropagation();
          if (sidebarStatus === "") setSidebarStatus("open");
          if (sidebarStatus === "close") setSidebarStatus("open");
          if (sidebarStatus === "open") setSidebarStatus("close");
        }}
      />
      <Link to="/" className="navbar__icon">
        <span className="navbar__text">The</span>
        <h4>Trailers</h4>
      </Link>
      <div
        className={`navbar__links ${
          sidebarStatus === "open" && "u__animation--sidebar-open"
        } ${sidebarStatus === "close" && "u__animation--sidebar-close"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Link to="/movies" className="navbar__link" onClick={() => setSidebarStatus("close")}>
          Movies
        </Link>
        <Link to="/tv-shows" className="navbar__link" onClick={() => setSidebarStatus("close")}>
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
