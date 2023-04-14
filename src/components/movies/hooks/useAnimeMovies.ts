import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import IMovie from "../../../models/IMovie";
import IGenre from "../../../models/IGenre";
import { moviesSelector } from "../../../react-query/selectors";
import ResultsWithDateDto from "../../../dtos/ResultsWithDateDto";
import MovieDto from "../../../dtos/MovieDto";

const url = "/movie/top_rated";
const queryString = "&with_genres=16&with_original_language=ja&with_movie=true";

async function getAnimeMovies(): Promise<ResultsWithDateDto<MovieDto>> {
  const response = await fetch(getFullUrl(url, queryString));
  const data = await response.json();

  return data;
}

export default function useAnimeMovies(genres: IGenre[]) {
  const fallback: IMovie[] = [];
  const { data = fallback } = useQuery(keys.animeMovies, getAnimeMovies, {
    select: (data) => moviesSelector(data, genres),
  });

  return data;
}
