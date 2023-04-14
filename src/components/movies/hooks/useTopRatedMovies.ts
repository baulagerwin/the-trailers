import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import IGenre from "../../../models/IGenre";
import IMovie from "../../../models/IMovie";
import { moviesSelector } from "../../../react-query/selectors";
import ResultsWithDateDto from "../../../dtos/ResultsWithDateDto";
import MovieDto from "../../../dtos/MovieDto";

const url = "/movie/top_rated";

async function getTopRatedMovies(): Promise<ResultsWithDateDto<MovieDto>> {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useTopRatedMovies(genres: IGenre[]) {
  const fallback: IMovie[] = [];
  const { data = fallback } = useQuery(keys.topRatedMovies, getTopRatedMovies, {
    select: (data) => moviesSelector(data, genres),
  });

  return data;
}
