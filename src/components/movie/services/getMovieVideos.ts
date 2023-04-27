import VideosDto from "../../../dtos/VideosDto";
import getFullUrl from "../../../tmdb/getFullUrl";

export default async function getMovieVideos(id: string): Promise<VideosDto> {
  const url = `/movie/${id}/videos`;
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}
