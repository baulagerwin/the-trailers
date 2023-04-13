import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import MoviesWithDateDto from "../../../dtos/MoviesWithDateDto";
import IMovie from "../../../models/IMovie";
import IGenre from "../../../models/IGenre";
import { moviesSelector } from "../../../tmdb/selectors";

const url = "/movie/upcoming";

async function getUpcomingMovies(): Promise<MoviesWithDateDto> {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useUpcomingMovies(genres: IGenre[]) {
  const fallback: IMovie[] = [];
  const {
    data = fallback,
    isLoading,
    isSuccess,
  } = useQuery(keys.upcomingMovies, getUpcomingMovies, {
    select: (data) => moviesSelector(data, genres),
  });

  return { results: data, isLoading, isSuccess };
}
