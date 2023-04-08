import getFullUrl from "../../../tmdb/getFullUrl";

async function getUpcomingMovies() {
  const url = "/movie/upcoming";
  const response = await fetch(getFullUrl(url));
  const data = response.json();

  return data;
}

export default function useUpcomingMovies() {
  const fallback = [];
}
