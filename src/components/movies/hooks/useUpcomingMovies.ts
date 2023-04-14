import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import IMovie from "../../../models/IMovie";
import IGenre from "../../../models/IGenre";
import { moviesSelector } from "../../../react-query/selectors";
import ResultsWithDateDto from "../../../dtos/ResultsWithDateDto";
import MovieDto from "../../../dtos/MovieDto";

const url = "/movie/upcoming";

async function getUpcomingMovies(): Promise<ResultsWithDateDto<MovieDto>> {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useUpcomingMovies(genres: IGenre[]) {
  const fallback: IMovie[] = [];
  const { data = fallback } = useQuery(keys.upcomingMovies, getUpcomingMovies, {
    select: (data) => moviesSelector(data, genres),
  });

  return data;
}
