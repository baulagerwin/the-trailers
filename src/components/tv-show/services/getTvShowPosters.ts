import PostersDto from "../../../dtos/PostersDto";
import getFullUrl from "../../../tmdb/getFullUrl";

export default async function getTvShowPosters(
  id: string
): Promise<PostersDto> {
  const url = `/tv/${id}/images`;
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}
