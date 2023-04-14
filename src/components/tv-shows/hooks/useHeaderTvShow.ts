import { useEffect, useState } from "react";
import { IHeader } from "../../common/header/Header";
import getRandomNumber from "../../../utils/getRandomBetween";
import ITvShow from "../../../models/ITvShow";

function useHeaderTvShow(tvShows: ITvShow[]) {
  const [headerMovie, setHeaderMovie] = useState<IHeader>();

  useEffect(() => {
    if (!!tvShows.length) {
      const index = getRandomNumber(0, 19);
      const tvShow = tvShows[index];
      const headerMovie: IHeader = {
        backgroundImageUrl: tvShow.backdrop_path,
        score: tvShow.vote_average,
        releaseDate: tvShow.first_air_date,
        title: tvShow.name,
        genres: tvShow.genres,
      };

      setHeaderMovie(headerMovie);
    }
  }, [tvShows]);

  return headerMovie;
}

export default useHeaderTvShow;
