import GenresDto from "../../../dtos/GenresDto";
import getFullUrl from "../../../tmdb/getFullUrl";

const url = "/genre/movie/list";

export default async function getMovieGenres(): Promise<GenresDto> {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}
