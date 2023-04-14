import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import GenresDto from "../../../dtos/GenresDto";
import IGenre from "../../../models/IGenre";
import { genresSelector } from "../../../react-query/selectors";

const url = "/genre/movie/list";

async function getMovieGenres(): Promise<GenresDto> {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useMovieGenres() {
  const fallback: IGenre[] = [];
  const { data = fallback } = useQuery(keys.movieGenres, getMovieGenres, {
    select: genresSelector,
  });

  return data;
}
