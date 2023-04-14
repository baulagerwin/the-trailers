import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import IMovie from "../../../models/IMovie";
import { moviesSelector } from "../../../react-query/selectors";
import IGenre from "../../../models/IGenre";
import ResultsWithDateDto from "../../../dtos/ResultsWithDateDto";
import MovieDto from "../../../dtos/MovieDto";

const url = "/trending/movie/week";

async function getTrendingMovies(): Promise<ResultsWithDateDto<MovieDto>> {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useTrendingMovies(genres: IGenre[]) {
  const fallback: IMovie[] = [];
  const { data = fallback } = useQuery(keys.trendingMovies, getTrendingMovies, {
    select: (data) => moviesSelector(data, genres),
  });

  return data;
}
