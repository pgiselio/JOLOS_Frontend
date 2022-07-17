import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .theme-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border: 1px solid ${(props) => props.theme.colors.systemMenu.border};
    background-color: var(--primary-bg);
    color: var(--text-a);
    cursor: pointer;
    border-radius: 5px;
    font-weight: 500;
    font-size: 16px;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    span {
      height: 20px;
      width: 20px;
      border-radius: 50%;
      border: 2px solid var(--text-b);
      position: relative;
      transition: all 0.2s linear;
      ::after {
        content: "\f00c";
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        -webkit-font-smoothing: antialiased;
        line-height: 16px !important;
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        text-align: center;
        font-style: normal;
        font-variant: normal;
        text-rendering: auto;
        line-height: 1;
        color: var(--inside-accent-color);
        opacity: 0;
        font-size: 10px;
        transition: opacity 0.5s ease;
      }
    }
    :hover span {
      background-color: var(--accent-color-opacity);
      border-color: var(--accent-color);
    }
    &.active {
      border-color: ${(props) => props.theme.colors.mainActive};
      background-color: var(--accent-color-opacity);
      color: var(--accent-color);
      span {
        background-color: var(--accent-color);
        border-color: var(--accent-color);
        ::after {
          opacity: 1;
        }
      }
    }
    .preview {
      display: flex;
      flex-direction: column;
    }
    .title {
    }
  }
`;
