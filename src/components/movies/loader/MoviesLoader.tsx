import { FallingLines } from "react-loader-spinner";

function MoviesLoader() {
  return (
    <div className="movies-loader">
      <FallingLines color="#fff" width={"30rem"} visible={true} />
    </div>
  );
}

export default MoviesLoader;
