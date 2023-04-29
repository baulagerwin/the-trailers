import SlideshowItem, { ISlideshowItem } from "./SlideshowItem";
import { IPopUpCategory } from "../popupFilms/PopUpFilms";
import Swiper from "../swiper/Swiper";
import { useNavigate } from "react-router-dom";
import SwiperItem from "../swiper/SwiperItem";

interface Props {
  of: string;
  discover: string;
  icon: React.ReactNode;
  type: string;
  items: ISlideshowItem[];
  onPopUpOpen: (e: React.MouseEvent, data: IPopUpCategory) => void;
  url: string;
}

function Slideshow({
  of,
  discover,
  icon,
  type,
  items,
  onPopUpOpen,
  url,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="slideshow">
      <div className="slideshow__header">
        <div className="slideshow__type">
          <span className="slideshow__type-text">
            {icon}
            {type}
          </span>
          <button
            type="button"
            className="slideshow__type-more"
            onClick={(e) => onPopUpOpen(e, { name: type, url })}
          >
            <span>See more</span>
          </button>
        </div>
      </div>
      <Swiper gap={"2.2rem"}>
        {items?.map((item) => {
          const whenClick = () => {
            navigate(`/${of}/${item.id}`);
          };

          return (
            <SwiperItem key={item.id} whenClick={whenClick}>
              <SlideshowItem
                discover={discover}
                item={item}
                onPopUpOpen={onPopUpOpen}
              />
            </SwiperItem>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Slideshow;
