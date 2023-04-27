import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import useOverlayTransition from "../../hooks/useOverlayTransition";
import useDisableMainScrollbar from "../../hooks/useDisableMainScrollbar";
import useSearchQueryString from "../../hooks/useSearchQueryString";

function Navbar() {
  const { pathname } = useLocation();
  const [search, debouncedSearch, onSearchChange] = useSearchQueryString(
    "q",
    ""
  );
  const { status, handleOnOpen, handleOnClose } = useOverlayTransition();
  useDisableMainScrollbar(status);

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
        <Link to="/movies" className={`navbar__link`} onClick={handleOnClose}>
          <span
            className={`${pathname.match(/\/movies$/) && "u__active--page"}`}
          >
            Movies
          </span>
        </Link>
        <Link to="/tv-shows" className={`navbar__link`} onClick={handleOnClose}>
          <span
            className={` ${pathname.match(/\/tv-shows$/) && "u__active--page"}`}
          >
            TV Shows
          </span>
        </Link>
      </div>
      <div className="navbar__search">
        <input
          type="text"
          className="navbar__input"
          placeholder={`Search for a ${
            pathname.match(/(movies)/) ? "movie" : "tv show"
          }`}
          value={search}
          onChange={onSearchChange}
        />
        <FiSearch className="navbar__magnifying-glass" />
      </div>
    </div>
  );
}

export default Navbar;
