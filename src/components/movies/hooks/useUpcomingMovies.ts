import { useQuery } from "react-query";
import getFullUrl from "../../../tmdb/getFullUrl";
import keys from "../../../react-query/keys";

const url = "/movie/upcoming";

async function getUpcomingMovies() {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}

export default function useUpcomingMovies() {
  const fallback = {};
  const {
    data = fallback,
    isLoading,
    isSuccess,
  } = useQuery(keys.upcomingMovies, getUpcomingMovies);

  return { results: data.results, isLoading, isSuccess };
}
