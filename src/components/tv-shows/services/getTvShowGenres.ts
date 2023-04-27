import GenresDto from "../../../dtos/GenresDto";
import getFullUrl from "../../../tmdb/getFullUrl";

const url = "/genre/tv/list";

export default async function getTvShowGenres(): Promise<GenresDto> {
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}
