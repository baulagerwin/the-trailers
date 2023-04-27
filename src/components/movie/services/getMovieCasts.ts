import CastsDto from "../../../dtos/CastsDto";
import getFullUrl from "../../../tmdb/getFullUrl";

export default async function getMovieCasts(id: string): Promise<CastsDto> {
  const url = `/movie/${id}/credits`;
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}
