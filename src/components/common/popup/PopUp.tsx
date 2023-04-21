import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  status: string;
  onClose: () => void;
}

function PopUp({ children, status, onClose }: Props) {
  useEffect(() => {
    if (status === "open") {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "visible";
      };
    }
  }, [status]);

  return (
    <div
      className={`popup ${status === "open" && "u__animation--popup-open"} ${
        status === "close" && "u__animation--popup-close"
      }`}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose();
        }
      }}
    >
      <div
        className={`popup__content ${
          status === "open" && "u__animation--popup-content-open"
        } ${status === "close" && "u__animation--popup-content-close"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default PopUp;
