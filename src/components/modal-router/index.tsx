import "./styles.css";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, BoxContent, BoxTitle } from "../box";
import { ModalStyle } from "../modal/style";

export function ModalRouter({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  let navigate = useNavigate();
  let buttonRef = useRef<HTMLButtonElement>(null);
  let closeRef = useRef<HTMLButtonElement>(null);
  const [closeClassNames, setCloseClassNames] = useState("");
  
  const preventDataLost = (event: any) => {
    event.preventDefault();
    event.returnValue = "";
  };
  useEffect(() => {
    window.addEventListener("beforeunload", preventDataLost);
    return () => {
      window.removeEventListener("beforeunload", preventDataLost);
    };
  }, []);
  function onDismiss() {
    navigate(-1);
  }
  function attentionToX() {
    closeRef.current?.focus();
    setCloseClassNames("attention");
    setTimeout(() => setCloseClassNames(""), 1000);
  }

  return (
    <ModalStyle
      aria-labelledby="label"
      initialFocusRef={buttonRef}
      onDismiss={attentionToX}
    >
      <BoxTitle className="box-title">
        <h2>{title}</h2>
        <div>
          <button
            aria-label="Close"
            className="close-button"
            ref={closeRef}
            onClick={onDismiss}
          >
            <i className={`fas fa-times ${closeClassNames}`}></i>
          </button>
        </div>
      </BoxTitle>

      <BoxContent>
        {children}
      </BoxContent>
    </ModalStyle>
  );
}
