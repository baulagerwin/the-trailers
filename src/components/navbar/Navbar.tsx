import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import useToggleWithAnimation from "../common/hooks/useToggleWithAnimation";

function Navbar() {
  const { status, handleOnOpen, handleOnClose } = useToggleWithAnimation();

  return (
    <div className="navbar">
      <GiHamburgerMenu className="navbar__hamburger" onClick={handleOnOpen} />
      <Link to="/" className="navbar__icon">
        <span className="navbar__text">The</span>
        <h4>Trailers</h4>
      </Link>
      <div
        className={`navbar__links ${
          status === "open" && "u__animation--sidebar-open"
        } ${status === "close" && "u__animation--sidebar-close"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Link to="/movies" className="navbar__link" onClick={handleOnClose}>
          Movies
        </Link>
        <Link to="/tv-shows" className="navbar__link" onClick={handleOnClose}>
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
