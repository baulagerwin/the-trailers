import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";

const url = "/movie/popular";

async function getPopularMovies() {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function usePopularMovies() {
  const fallback = {};
  const {
    data = fallback,
    isLoading,
    isSuccess,
  } = useQuery(keys.popularMovies, getPopularMovies);

  return { results: data.results, isLoading, isSuccess };
}
