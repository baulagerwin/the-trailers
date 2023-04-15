import { useEffect, useRef, useState } from "react";
import SlideshowItem, { ISlideshowItem } from "./SlideshowItem";
import { IoIosArrowRoundForward } from "react-icons/io";

interface Props {
  icon: React.ReactNode;
  type: string;
  items: ISlideshowItem[];
  onPopUpOpen: (e: React.MouseEvent) => void;
}

function Slideshow({ icon, type, items, onPopUpOpen }: Props) {
  const itemRef = useRef<HTMLDivElement>(null);

  const [isDown, setIsDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);

  useEffect(() => {
    if (!itemRef.current) return;

    itemRef.current.scroll(position, 0);
  }, [position]);

  function handleOnMouseDown(e: React.MouseEvent) {
    e.stopPropagation();
    setIsDown(true);
    setStartX(e.nativeEvent.pageX + position);
  }

  function handleOnMouseMove(e: React.MouseEvent) {
    e.stopPropagation();

    if (!isDown) return;
    if (!itemRef.current) return;

    let maxScrollX = itemRef.current.scrollWidth - itemRef.current.clientWidth;
    let offsetX = e.nativeEvent.pageX;
    let diff = startX - offsetX;
    let scrollX = diff;

    if (scrollX < 0) {
      setPosition(0);
      return;
    }

    if (scrollX >= maxScrollX) {
      setPosition(maxScrollX);
      return;
    }

    setPosition(scrollX);
  }

  function handleOnMouseUp(e: React.MouseEvent) {
    e.stopPropagation();
    setIsDown(false);
    setStartX(0);
  }

  function handleOnMouseLeave(e: React.MouseEvent) {
    e.stopPropagation();
    setIsDown(false);
    setStartX(0);
  }

  function handleOnTouchStart(e: React.TouchEvent) {
    e.stopPropagation();
    setIsDown(true);
    setStartX(e.touches[0].clientX + position);
  }

  function handleOnTouchMove(e: React.TouchEvent) {
    if (!isDown) return;
    if (!itemRef.current) return;

    let maxScrollX = itemRef.current.scrollWidth - itemRef.current.clientWidth;
    let offsetX = e.touches[0].clientX;
    let diff = startX - offsetX;
    let scrollX = diff;

    if (scrollX < 0) {
      setPosition(0);
      return;
    }

    if (scrollX >= maxScrollX) {
      setPosition(maxScrollX);
      return;
    }

    setPosition(scrollX);
  }

  function handleOnTouchEnd(e: React.TouchEvent) {
    e.stopPropagation();
    setIsDown(false);
    setStartX(0);
  }

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
            onClick={onPopUpOpen}
          >
            <span>See more</span>
            {/* <IoIosArrowRoundForward className="slideshow__type-arrow" /> */}
          </button>
        </div>
      </div>
      <div
        ref={itemRef}
        className="slideshow__window"
        onMouseDown={handleOnMouseDown}
        onMouseMove={handleOnMouseMove}
        onMouseUp={handleOnMouseUp}
        onMouseLeave={handleOnMouseLeave}
        onTouchStart={handleOnTouchStart}
        onTouchMove={handleOnTouchMove}
        onTouchEnd={handleOnTouchEnd}
      >
        <ul className="slideshow__items">
          {items?.map((item) => (
            <SlideshowItem
              key={item.id}
              item={item}
              onPopUpOpen={onPopUpOpen}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Slideshow;
