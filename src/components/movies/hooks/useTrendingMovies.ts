import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import IMovie from "../../../models/IMovie";
import { moviesSelector } from "../../../react-query/selectors";
import IGenre from "../../../models/IGenre";
import MovieDto from "../../../dtos/MovieDto";
import ResultsDto from "../../../dtos/ResultsDto";
import { useQuery } from "@tanstack/react-query";

const url = "/trending/movie/week";

async function getTrendingMovies(): Promise<ResultsDto<MovieDto>> {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useTrendingMovies(genres: IGenre[]) {
  const fallback: IMovie[] = [];

  const { data = fallback } = useQuery({
    queryKey: [keys.trendingMovies],
    queryFn: getTrendingMovies,
    select: (data) => moviesSelector(data, genres),
  });

  return data;
}
