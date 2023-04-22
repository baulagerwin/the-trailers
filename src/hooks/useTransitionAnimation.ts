import { useEffect, useState } from "react";

function useTransitionAnimation() {
  const [status, setStatus] = useState("");

  function handleOnClose() {
    if (status === "open") {
      setStatus("close");
    }
  }

  function handleOnOpen(e: React.MouseEvent) {
    e.stopPropagation();

    if (status === "") setStatus("open");
    if (status === "close") setStatus("open");
    if (status === "open") setStatus("close");
  }

  useEffect(() => {
    document.addEventListener("click", handleOnClose);

    return () => document.removeEventListener("click", handleOnClose);
  }, [status]);

  return { status, handleOnOpen, handleOnClose };
}

export default useTransitionAnimation;
