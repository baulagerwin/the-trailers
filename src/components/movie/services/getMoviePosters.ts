import PostersDto from "../../../dtos/PostersDto";
import getFullUrl from "../../../tmdb/getFullUrl";

export default async function getMoviePosters(id: string): Promise<PostersDto> {
  const url = `/movie/${id}/images`;
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}
