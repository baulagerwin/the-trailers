import IMovieDetails from "../../../models/IMovieDetails";
import getFullUrl from "../../../tmdb/getFullUrl";

export default async function getMovie(id: string): Promise<IMovieDetails> {
  const url = `/movie/${id}`;
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}
