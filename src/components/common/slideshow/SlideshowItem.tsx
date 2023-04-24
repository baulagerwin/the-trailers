import { useNavigate } from "react-router-dom";
import basePosterURL from "../../../tmdb/basePosterURL";
import getMonthDay from "../../../utils/getMonthDay";
import { useState } from "react";
import IGenre from "../../../models/IGenre";
import getFullUrl from "../../../tmdb/getFullUrl";
import { IPopUpCategory } from "../popupFilms/PopUpFilms";

export interface ISlideshowItem {
  id: number;
  imageUrl: string;
  title: string;
  releaseDate: string;
  genres: IGenre[];
}

interface Props {
  of: string;
  item: ISlideshowItem;
  onPopUpOpen: (e: React.MouseEvent, data: IPopUpCategory) => void;
}

function SlideshowItem({ of, item, onPopUpOpen }: Props) {
  const navigate = useNavigate();
  const [startX, setStartX] = useState(0);

  function handleOnMouseDown(e: React.MouseEvent) {
    setStartX(e.nativeEvent.pageX);
  }

  function handleOnMouseUp(e: React.MouseEvent) {
    if (startX !== e.nativeEvent.pageX) return;
    navigate(`/movies`);
  }

  function handleOnTouchStart(e: React.TouchEvent) {
    setStartX(e.touches[0]?.clientX);
  }

  function handleOnTouchEnd(e: React.TouchEvent) {
    if (startX !== e.touches[0]?.clientX) return;
    navigate(`/movies`);
  }

  return (
    <li>
      {!!item && (
        <div
          className="slideshow__item"
          onMouseDown={handleOnMouseDown}
          onMouseUp={handleOnMouseUp}
          onTouchStart={handleOnTouchStart}
          onTouchEnd={handleOnTouchEnd}
        >
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
              <span
                style={{
                  border: `1px solid ${
                    item.genres[item.genres.length - 1]?.borderColor
                  }`,
                }}
              >
                <div
                  className="u__overlay--cover"
                  onMouseUp={(e) => e.stopPropagation()}
                  onClick={(e) =>
                    onPopUpOpen(e, {
                      name: item.genres[item.genres.length - 1]?.name,
                      url: getFullUrl(
                        `/discover/${of}`,
                        `&with_genres=${
                          item.genres[item.genres.length - 1]?.id
                        }`
                      ),
                    })
                  }
                ></div>
                {item.genres[item.genres.length - 1]?.name}
              </span>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

export default SlideshowItem;
