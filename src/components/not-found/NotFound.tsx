function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__text">
        <h1>Uh-Oh...</h1>
        <p className="not-found__message">
          The page you are looking for may have been moved, deleted, or possibly
          never existed.
        </p>
        <span>404</span>
      </div>
    </div>
  );
}

export default NotFound;
