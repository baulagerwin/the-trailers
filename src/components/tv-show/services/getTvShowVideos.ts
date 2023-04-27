import VideosDto from "../../../dtos/VideosDto";
import getFullUrl from "../../../tmdb/getFullUrl";

export default async function getTvShowVideos(id: string): Promise<VideosDto> {
  const url = `/tv/${id}/videos`;
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}
