import getFullUrl from "../../tmdb/getFullUrl";

function Movies() {
  const upcomingMoviesUrl = getFullUrl("/movie/upcoming");
  console.log(upcomingMoviesUrl);

  return (
    <div className="movies">
      <div className="movies__header"></div>
      <div className="movies__body"></div>
    </div>
  );
}

export default Movies;
