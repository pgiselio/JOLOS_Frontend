import { ReactNode, useRef } from "react";
import { Box, BoxContent, BoxTitle } from "../box";
import { Button } from "../button";
import { ModalRouterStyle } from "../modal-router/style";

export function Modal({
  title,
  open = true,
  children,
  handleClose,
  toForm,
}: {
  title: string;
  children: ReactNode;
  open?: boolean;
  handleClose?: () => void;
  toForm?: string;
}) {
  let buttonRef = useRef<HTMLButtonElement>(null);
  let closeRef = useRef<HTMLButtonElement>(null);
  function onDismiss() {
    if (handleClose) {
      handleClose();
    }
  }

  return (
    <ModalRouterStyle
      isOpen={open}
      aria-labelledby="label"
      initialFocusRef={buttonRef}
      onDismiss={onDismiss}
    >
      <Box className="box">
        <BoxTitle className="box-title">
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <h2>{title}</h2>
          </div>
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
      </Box>
    </ModalRouterStyle>
  );
}
