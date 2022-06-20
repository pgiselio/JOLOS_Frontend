import styled, { css } from "styled-components";

interface InputProps {
  hasIcon?: boolean;
  [x: string]: any;
}
export const InputStyle = css`
  font-family: "Roboto", sans-serif;
  border: 1px solid var(--outline-color);
  border-radius: 5px;
  padding: 10px 8px;
  outline: 0;
  box-shadow: 0 0 0 0 rgba(45, 143, 65, 0.308);
  transition: box-shadow 0.4s, border 0.2s, background 0.2s linear;
  color: var(--text-a);
  background: #ffffff1a;
  &:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.2rem rgba(45, 143, 65, 0.308);
  }
  &.danger {
    border-color: #c91f1f;
  }
`;
export const InputStyled = styled.input<InputProps>`
  ${InputStyle}
  padding-left: ${(props) => (props.hasIcon ? "40px" : "10px")};
`;

export const InputPassStyled = styled(InputStyled)`
  padding-right: 35px;
`;

export const InputContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  input {
    width: 100%;
  }
  i {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: #686868;
    pointer-events: none;
  }
  input:focus ~ i {
    color: var(--accent-color);
  }
`;

export const ShowPasswordButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  right: 0;
  width: 35px;
  justify-content: center;
  height: 100%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  border-radius: 10px;
  background: transparent;
  border: none;
  outline-color: var(--accent-color);

  &:focus-visible {
    box-shadow: 0 0 0 0.2rem rgba(45, 143, 65, 0.308);
  }
  &::after {
    all: unset;
    content: "\f06e";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    font-size: 13px;
    position: relative;
    color: var(--accent-color);
    height: 14px;
    transition: color 0.2s ease;
  }
  &.active::after {
    content: "\f070";
    color: var(--accent-color-active);
  }
`;
