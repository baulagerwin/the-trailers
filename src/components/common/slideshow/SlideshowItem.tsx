import basePosterURL from "../../../tmdb/basePosterURL";
import getMonthDay from "../../../utils/getMonthDay";
import IGenre from "../../../models/IGenre";
import getFullUrl from "../../../tmdb/getFullUrl";
import { IPopUpCategory } from "../popupFilms/PopUpFilms";
import GenreButton from "../genreButton/GenreButton";

export interface ISlideshowItem {
  id: number;
  imageUrl: string;
  title: string;
  releaseDate: string;
  genres: IGenre[];
}

interface Props {
  discover: string;
  item: ISlideshowItem;
  onPopUpOpen: (e: React.MouseEvent, data: IPopUpCategory) => void;
}

function SlideshowItem({ discover, item, onPopUpOpen }: Props) {
  return (
    <div className="slideshow__item">
      <div className="slideshow__image">
        <div className="u__overlay--cover"></div>
        <img src={basePosterURL + item.imageUrl} alt="Poster" />
      </div>
      <div className="slideshow__title">{item?.title}</div>
      <div className="slideshow__release-date">
        {getMonthDay(item?.releaseDate as string)}
      </div>
      <div className="slideshow__genre">
        {item.genres[item.genres.length - 1]?.borderColor && (
          <GenreButton genre={item.genres[item.genres.length - 1]}>
            <div
              className="u__overlay--cover"
              onMouseUp={(e) => e.stopPropagation()}
              onClick={(e) =>
                onPopUpOpen(e, {
                  name: item.genres[item.genres.length - 1]?.name,
                  url: getFullUrl(
                    `/discover/${discover}`,
                    `&with_genres=${item.genres[item.genres.length - 1]?.id}`
                  ),
                })
              }
            />
          </GenreButton>
        )}
      </div>
    </div>
  );
}

export default SlideshowItem;
