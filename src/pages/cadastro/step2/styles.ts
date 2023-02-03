import styled from "styled-components";
import { InputStyle } from "../../../components/input/styles";

export const CadastroStep2Style = styled.div`
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    animation: slide-left 0.5s ease;
    h1 {
      font-size: 90px;
      line-height: 90px;
      color: var(--accent-color);
    }
    .message {
      max-width: 300px;
      color: var(--text-b);
      text-align: center;
      font-size: 14px;
    }
    .code-fields {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 6px;
      margin-top: 10px;
      .code-field {
        display: flex;
        align-items: center;
        justify-content: center;
        ${InputStyle}
        caret-color: var(--accent-color);
        font-size: 20px;
        font-weight: 500;
        padding: 5px;
        text-align: center;
        max-width: 35px;
        height: 40px;
      }
      .code-field--selected {
        border-color: var(--accent-color);
        box-shadow: 0 0 0 0.2rem rgb(45 143 65 / 31%);
      }
    }
  }
`;
