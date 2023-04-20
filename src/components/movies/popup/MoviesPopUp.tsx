import PopUp from "../../common/popup/PopUp";
import { BsArrowRight } from "react-icons/bs";

export interface IMoviesPopUp {
  name: string;
  url: string;
}

interface Props {
  data: IMoviesPopUp;
  status: string;
  onClose: () => void;
}

function MoviesPopUp({ data, status, onClose }: Props) {
  return (
    <PopUp status={status} onClose={onClose}>
      <div className="movies-popup">
        <header className="movies-popup__header">
          <h2>{data.name}</h2>
          <BsArrowRight className="movies-popup__back-icon" onClick={onClose} />
        </header>
        <div className="movies-popup__body"></div>
      </div>
    </PopUp>
  );
}

export default MoviesPopUp;
