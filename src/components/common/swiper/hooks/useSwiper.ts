import React, { useEffect, useRef, useState } from "react";

function useSwiper() {
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

  return {
    itemRef,
    handleOnMouseDown,
    handleOnMouseLeave,
    handleOnMouseMove,
    handleOnMouseUp,
    handleOnTouchStart,
    handleOnTouchMove,
    handleOnTouchEnd,
  };
}

export default useSwiper;
