import { Link, useNavigate } from "react-router-dom";
import basePosterURL from "../../../tmdb/basePosterURL";
import getMonthDay from "../../../utils/getMonthDay";
import IMovie from "../../../models/IMovie";
import { useState } from "react";

interface Props {
  movie: IMovie;
}

function SlideshowItem({ movie }: Props) {
  const navigate = useNavigate();
  const [startX, setStartX] = useState(0);

  function handleOnMouseDown(e: React.MouseEvent) {
    setStartX(e.nativeEvent.pageX);
  }

  function handleOnMouseUp(e: React.MouseEvent) {
    if (startX !== e.nativeEvent.pageX) return;
    navigate(`/`);
  }

  function handleOnTouchStart(e: React.TouchEvent) {
    setStartX(e.touches[0]?.clientX);
  }

  function handleOnTouchEnd(e: React.TouchEvent) {
    if (startX !== e.touches[0]?.clientX) return;
    navigate(`/`);
  }

  return (
    <li
      className="slideshow__item"
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onTouchStart={handleOnTouchStart}
      onTouchEnd={handleOnTouchEnd}
    >
      <div className="slideshow__image">
        <div className="slideshow__cover"></div>
        <img src={movie && basePosterURL + movie.poster_path} alt="Poster" />
      </div>
      <div className="slideshow__title">{movie?.title}</div>
      <div className="slideshow__release-date">
        {getMonthDay(movie?.release_date as string)}
      </div>
      <div className="slideshow__genre">
        <div className="slideshow__cover"></div>
        <span style={{ border: `1px solid ${movie.genres[0]?.borderColor}` }}>
          {movie.genres[0]?.name}
        </span>
      </div>
    </li>
  );
}

export default SlideshowItem;
