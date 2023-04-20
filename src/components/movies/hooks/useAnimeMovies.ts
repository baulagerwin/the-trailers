import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import IMovie from "../../../models/IMovie";
import IGenre from "../../../models/IGenre";
import { moviesSelector } from "../../../react-query/selectors";
import MovieDto from "../../../dtos/MovieDto";
import ResultsDto from "../../../dtos/ResultsDto";
import { useQuery } from "@tanstack/react-query";

const url = "/movie/top_rated";
const queryString = "&with_genres=16&with_original_language=ja&with_movie=true";

export const animeMoviesUrl = getFullUrl(url, queryString);

async function getAnimeMovies(): Promise<ResultsDto<MovieDto>> {
  const response = await fetch(animeMoviesUrl);
  const data = await response.json();

  return data;
}

export default function useAnimeMovies(genres: IGenre[]) {
  const fallback: IMovie[] = [];

  const { data = fallback } = useQuery({
    queryKey: [keys.animeMovies],
    queryFn: getAnimeMovies,
    select: (data) => moviesSelector(data, genres),
  });

  return data;
}
