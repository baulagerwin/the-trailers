import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import GenresDto from "../../../dtos/GenresDto";
import IGenre from "../../../models/IGenre";
import { genresSelector } from "../../../react-query/selectors";
import { useQuery } from "@tanstack/react-query";

const url = "/genre/movie/list";

async function getMovieGenres(): Promise<GenresDto> {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useMovieGenres() {
  const fallback: IGenre[] = [];

  const { data = fallback } = useQuery({
    queryKey: [keys.movieGenres],
    queryFn: getMovieGenres,
    select: genresSelector,
  });

  return data;
}
