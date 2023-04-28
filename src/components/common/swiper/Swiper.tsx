import useSwiper from "./hooks/useSwiper";

interface Props {
  children: React.ReactNode;
}

function Swiper({ children }: Props) {
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
      {children}
    </div>
  );
}

export default Swiper;
