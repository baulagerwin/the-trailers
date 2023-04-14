import PopUp from "../../common/popup/PopUp";

interface Props {
  onClose: () => void;
}

function MoviesPopUp({ onClose }: Props) {
  return <PopUp onClose={onClose}>Something</PopUp>;
}

export default MoviesPopUp;
