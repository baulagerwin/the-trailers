import { useEffect, useState } from "react";
import getRandomNumber from "../utils/getRandomBetween";
import { IHeader } from "../components/common/header/Header";
import IGenre from "../models/IGenre";

interface IFilm {
  backdrop_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  name?: string;
  title?: string;
  genres: IGenre[];
}

function useHeaderFilm<T extends IFilm>(films: T[]) {
  const [headerFilm, setHeaderMovie] = useState<IHeader>();

  useEffect(() => {
    if (!!films.length) {
      const index = getRandomNumber(0, 19);
      const randomFilm = films[index];
      let headerFilm: IHeader;

      if (randomFilm.release_date && randomFilm.title) {
        headerFilm = {
          backgroundImageUrl: randomFilm.backdrop_path,
          score: randomFilm.vote_average,
          releaseDate: randomFilm.release_date,
          title: randomFilm.title,
          genres: randomFilm.genres,
        };
        setHeaderMovie(headerFilm);
      }

      if (randomFilm.first_air_date && randomFilm.name) {
        headerFilm = {
          backgroundImageUrl: randomFilm.backdrop_path,
          score: randomFilm.vote_average,
          releaseDate: randomFilm.first_air_date,
          title: randomFilm.name,
          genres: randomFilm.genres,
        };
        setHeaderMovie(headerFilm);
      }
    }
  }, [films]);

  return headerFilm;
}

export default useHeaderFilm;
