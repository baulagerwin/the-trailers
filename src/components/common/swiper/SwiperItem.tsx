import useSwiperItem from "./hooks/useSwiperItem";

interface Props {
  children: React.ReactNode;
  whenClick: () => void;
}

function SwiperItem({ children, whenClick }: Props) {
  const swiperItem = useSwiperItem(whenClick);

  return (
    <li
      onMouseDown={swiperItem.handleOnMouseDown}
      onMouseUp={swiperItem.handleOnMouseUp}
      onTouchStart={swiperItem.handleOnTouchStart}
      onTouchEnd={swiperItem.handleOnTouchEnd}
    >
      {children}
    </li>
  );
}

export default SwiperItem;
