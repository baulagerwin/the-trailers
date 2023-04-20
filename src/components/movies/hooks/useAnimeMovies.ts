import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import IMovie from "../../../models/IMovie";
import IGenre from "../../../models/IGenre";
import { moviesSelector } from "../../../react-query/selectors";
import MovieDto from "../../../dtos/MovieDto";
import ResultsDto from "../../../dtos/ResultsDto";
import { useQuery } from "@tanstack/react-query";

const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);

const url = "/discover/movie";
const queryString = `&with_genres=16&sort_by=popularity.desc&include_adult=false&primary_release_date.lte=${formattedDate}&with_original_language=ja`;

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
