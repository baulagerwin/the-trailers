import IGenre from "../models/IGenre";

export default function (id: number, genres: IGenre[]): IGenre {
  let genre = genres.find((g) => g.id === id) as IGenre;

  return genre;
}
