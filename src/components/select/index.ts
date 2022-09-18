import styled from "styled-components";
import Select from "react-select";
import { InputStyle } from "../input/styles";

export const CustomSelect = styled(Select).attrs((props) => ({
  classNamePrefix: "Select",
  noOptionsMessage: !props.noOptionsMessage
    ? () => "Sem opções"
    : props.noOptionsMessage,
}))`
  .Select__control {
    ${InputStyle}
    padding: 5.5px 8px;
    &:hover {
      border-color: var(--outline-color);
    }
  }
  .Select__control--is-focused {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.2rem rgba(45, 143, 65, 0.308);
    &:hover {
      border-color: var(--accent-color);
    }
  }
  .Select__placeholder {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-b);
  }
  .Select__input-container {
    color: var(--text-a);
  }
  .Select__value-container {
    padding: 0;
  }
  .Select__single-value {
    color: var(--text-a);
  }
  .Select__menu {
    background-color: var(--primary-bg);
    .Select__option--is-focused {
      background-color: ${(props) => props.theme.colors.main}25;
    }
    .Select__option--is-selected {
      background-color: var(--accent-color-active);
    }
    .Select__option:not(.Select__option--is-selected):active {
      background-color: ${(props) => props.theme.colors.main}50;
    }
  }
  &.danger {
    .Select__control {
      border-color: #c91f1f;
    }
    .Select__control--is-focused {
      box-shadow: 0 0 0 0.2rem #c91f1f60;
    }
  }
`;
