import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <hr />
        <Link to="/" className="footer__icon">
          <span className="footer__text">The</span>
          <h3>Trailers</h3>
        </Link>
        <p className="footer__powered">
          Powered by{" "}
          <a href="https://twitter.com/themoviedb?lang=en" target="_blank">
            @themoviedb
          </a>
        </p>
        <p className="footer__creator">Crafted by Gerwin Baula</p>
        <p className="footer__copyright">All rights reserved. &copy; 2023</p>
      </div>
    </footer>
  );
}

export default Footer;
