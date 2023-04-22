import { useEffect } from "react";

function useDisableMainScrollbar(status: string) {
  useEffect(() => {
    if (status === "open") {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "visible";
      };
    }
  }, [status]);
}

export default useDisableMainScrollbar;
