import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";

const url = "/trending/movie/week";

async function getTrendingMovies() {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useTrendingMovies() {
  const fallback = {};
  const {
    data = fallback,
    isLoading,
    isSuccess,
  } = useQuery(keys.nowPlayingMovies, getTrendingMovies);

  return { results: data.results, isLoading, isSuccess };
}
