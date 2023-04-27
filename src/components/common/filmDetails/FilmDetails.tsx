import { TiArrowForwardOutline } from "react-icons/ti";
import GenreButton from "../genreButton/GenreButton";
import IGenre from "../../../models/IGenre";

interface IFilm {
  tagline: string;
  title?: string;
  name?: string;
  genres: IGenre[];
  homepage: string;
}

interface Props<T extends IFilm> {
  film: T;
}

function FilmDetails<T extends IFilm>({ film }: Props<T>) {
  return (
    <div className="film-details">
      {!!film?.tagline && (
        <span className="film-details__tagline">{film?.tagline}</span>
      )}
      <div className="film-details__title">{film?.title || film?.name}</div>
      <div className="film-details__buttons">
        <div className="film-details__genres">
          {film?.genres.map((genre) => (
            <GenreButton key={genre.id} children={null} genre={genre} />
          ))}
        </div>
        <a
          href={
            !!film?.homepage
              ? film?.homepage
              : "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
          }
          target="_blank"
          className="film-details__link"
        >
          <TiArrowForwardOutline />
        </a>
      </div>
      <div className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, dolorum.
        Sit architecto consequatur earum sapiente aspernatur magni incidunt
        ipsum quidem! Saepe quo doloremque corrupti amet ea vitae quidem aperiam
        pariatur quis a, illo hic? Adipisci illo perferendis accusantium tempora
        laudantium! Eum nobis veniam eligendi neque molestiae possimus dolorum,
        ullam voluptas vero sit nam itaque soluta at laudantium cumque mollitia
        fugiat iure accusantium. At tempora, perspiciatis modi accusantium
        libero nisi, quae fuga tenetur voluptatibus omnis natus impedit ullam
        facere quod doloremque praesentium! Animi, optio. A laboriosam eveniet
        earum, eligendi ratione rem nam cumque accusamus. Sit voluptates nobis
        laboriosam inventore neque totam, vero vel necessitatibus consequuntur
        magnam est! Placeat fuga, quos voluptatem quod, totam alias eveniet sunt
        incidunt, libero nesciunt hic ad culpa rerum illum quas. Deleniti fugit
        fugiat nisi harum eos molestias laboriosam at. Sit autem numquam ipsam
        recusandae accusamus neque minus. Dolorem excepturi quo incidunt
        delectus assumenda, ipsa temporibus vel alias deleniti laborum iusto at.
        Alias dignissimos nam veritatis accusantium dolor a delectus beatae
        sapiente, eos qui fuga esse odio fugit facilis accusamus cumque harum
        eius? Harum, autem. Unde, architecto odio ea ab quaerat cumque nesciunt
        maxime eum dignissimos tenetur, vitae repellat nobis nisi aliquam
        accusamus vel dolores earum quae?
      </div>
    </div>
  );
}

export default FilmDetails;
