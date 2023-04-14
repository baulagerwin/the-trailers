import { useEffect, useState } from "react";
import { IHeader } from "../../common/header/Header";
import IMovie from "../../../models/IMovie";
import getRandomNumber from "../../../utils/getRandomBetween";

function useHeaderMovie(movies: IMovie[]) {
  const [headerMovie, setHeaderMovie] = useState<IHeader>();

  useEffect(() => {
    if (!!movies.length) {
      const index = getRandomNumber(0, 19);
      const randomMovie = movies[index];
      const headerMovie: IHeader = {
        backgroundImageUrl: randomMovie.backdrop_path,
        score: randomMovie.vote_average,
        releaseDate: randomMovie.release_date,
        title: randomMovie.title,
        genres: randomMovie.genres,
      };

      setHeaderMovie(headerMovie);
    }
  }, [movies]);

  return headerMovie;
}

export default useHeaderMovie;
