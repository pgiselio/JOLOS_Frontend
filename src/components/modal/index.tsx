import { ReactNode, useRef } from "react";
import { BoxContent, BoxTitle } from "../box";
import { Button } from "../button";
import { ModalStyle } from "./style";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: ReactNode;
  open?: boolean;
  handleClose?: () => void;
  toForm?: string;
}
export function Modal({
  title,
  open = true,
  children,
  handleClose,
  toForm,
  ...rest
}: ModalProps) {
  let buttonRef = useRef<HTMLButtonElement>(null);
  let closeRef = useRef<HTMLButtonElement>(null);
  function onDismiss() {
    if (handleClose) {
      handleClose();
    }
  }

  return (
    <ModalStyle
      isOpen={open}
      aria-labelledby="label"
      initialFocusRef={buttonRef}
      onDismiss={onDismiss}
      {...rest}
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
            <i className={`fas fa-times`}></i>
          </button>
        </div>
        {toForm && (
          <div>
            <Button
              type="submit"
              style={{ padding: "6px 16px" }}
              form={toForm}
              ref={buttonRef}
            >
              Criar
            </Button>
          </div>
        )}
      </BoxTitle>

      <BoxContent
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        {children}
      </BoxContent>
    </ModalStyle>
  );
}
