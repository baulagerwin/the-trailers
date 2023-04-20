import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import IGenre from "../../../models/IGenre";
import IMovie from "../../../models/IMovie";
import { moviesSelector } from "../../../react-query/selectors";
import MovieDto from "../../../dtos/MovieDto";
import ResultsDto from "../../../dtos/ResultsDto";
import { useQuery } from "@tanstack/react-query";

const url = "/movie/top_rated";

export const topRatedMoviesUrl = getFullUrl(url);

async function getTopRatedMovies(): Promise<ResultsDto<MovieDto>> {
  const response = await fetch(topRatedMoviesUrl);
  const data = await response.json();

  return data;
}

export default function useTopRatedMovies(genres: IGenre[]) {
  const fallback: IMovie[] = [];

  const { data = fallback } = useQuery({
    queryKey: [keys.topRatedMovies],
    queryFn: getTopRatedMovies,
    select: (data) => moviesSelector(data, genres),
  });

  return data;
}
