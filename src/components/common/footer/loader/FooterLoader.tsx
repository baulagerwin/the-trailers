function FooterLoader() {
  return (
    <footer className="footer-loader">
      <div className="footer-loader__content u__animation--pulse">
        <hr />
        <span className="footer-loader__icon">
          <span className="footer-loader__text"></span>
          <span className="footer-loader__logo"></span>
        </span>
        <p className="footer-loader__powered"></p>
        <p className="footer-loader__creator"></p>
        <p className="footer-loader__copyright"></p>
      </div>
    </footer>
  );
}

export default FooterLoader;
