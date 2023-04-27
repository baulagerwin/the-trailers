import ITvShowDetails from "../../../models/ITvShowDetails";
import getFullUrl from "../../../tmdb/getFullUrl";

export default async function getTvShow(id: string): Promise<ITvShowDetails> {
  const url = `/tv/${id}`;
  const response = await fetch(getFullUrl(url));
  const data = await response.json();

  return data;
}
