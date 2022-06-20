import styled from "styled-components";
import Select from "react-select";

export const CustomSelect = styled(Select).attrs((props) => ({
  classNamePrefix: "Select",
  noOptionsMessage: !props.noOptionsMessage
    ? () => "Sem opções"
    : props.noOptionsMessage,
}))`
  .Select__control {
    font-family: "Roboto", sans-serif;
    font-size: 13px;
    border-color: var(--outline-color);
    border-radius: 5px;
    box-shadow: 0 0 0 0 rgba(45, 143, 65, 0.308);
    transition: box-shadow 0.4s, border 0.2s, background 0.2s linear;
    color: var(--text-a);
    background: #ffffff1a;
    &:hover {
      border-color: var(--accent-color);
    }
  }
  .Select__control--is-focused {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 0.2rem rgba(45, 143, 65, 0.308);
  }
  .Select__input-container {
    color: var(--text-a);
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
