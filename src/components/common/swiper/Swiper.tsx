import useSwiper from "./hooks/useSwiper";

interface Props {
  children: React.ReactNode;
  gap: string;
}

function Swiper({ children, gap }: Props) {
  const swiper = useSwiper();

  return (
    <div
      ref={swiper.itemRef}
      className="swiper"
      onMouseDown={swiper.handleOnMouseDown}
      onMouseMove={swiper.handleOnMouseMove}
      onMouseUp={swiper.handleOnMouseUp}
      onMouseLeave={swiper.handleOnMouseLeave}
      onTouchStart={swiper.handleOnTouchStart}
      onTouchMove={swiper.handleOnTouchMove}
      onTouchEnd={swiper.handleOnTouchEnd}
    >
      <ul className="swiper__items" style={{ gap: `${gap}` }}>
        {children}
      </ul>
    </div>
  );
}

export default Swiper;
