import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";
import MoviesWithDateDto from "../../../dtos/MoviesWithDateDto";
import IMovie from "../../../models/IMovie";
import { moviesSelector } from "../../../tmdb/selectors";
import IGenre from "../../../models/IGenre";

const url = "/trending/movie/week";

async function getTrendingMovies(): Promise<MoviesWithDateDto> {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useTrendingMovies(genres: IGenre[]) {
  const fallback: IMovie[] = [];
  const {
    data = fallback,
    isLoading,
    isSuccess,
  } = useQuery(keys.nowPlayingMovies, getTrendingMovies, {
    select: (data) => moviesSelector(data, genres),
  });

  return { results: data, isLoading, isSuccess };
}
