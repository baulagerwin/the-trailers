import { useState } from "react";

function useSwiperItem(whenClick: () => void) {
  const [startX, setStartX] = useState(0);

  function handleOnMouseDown(e: React.MouseEvent) {
    setStartX(e.nativeEvent.pageX);
  }

  function handleOnMouseUp(e: React.MouseEvent) {
    if (startX !== e.nativeEvent.pageX) return;
    whenClick();
  }

  function handleOnTouchStart(e: React.TouchEvent) {
    setStartX(e.touches[0]?.clientX);
  }

  function handleOnTouchEnd(e: React.TouchEvent) {
    if (startX !== e.touches[0]?.clientX) return;
    whenClick();
  }

  return {
    handleOnMouseDown,
    handleOnMouseUp,
    handleOnTouchStart,
    handleOnTouchEnd,
  };
}

export default useSwiperItem;
