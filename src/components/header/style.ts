import styled from "styled-components";

export const HeaderSysStyle = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 19;
  max-width: 100vw;
  height: var(--top-bar-height);

  .navigate {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: var(--top-bar-height);
    background: var(--navs-bg);
    /* box-shadow: 0 1px 10px rgb(0 0 0 / 8%); */
  }

  .menu-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    height: 100%;
  }

  .logo-link{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .menu-container .logo {
    height: calc((var(--top-bar-height)) - 20px);
    width: auto;
  }

  .btn-notify {
    background: transparent;
    border: none;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 1px solid transparent;
    position: relative;
    cursor: pointer;
    color: var(--text-b);
    i {
      line-height: 35px;
      font-size: 18px;
    }
    span {
      background: #d30808;
      border: 2px solid var(--navs-bg);
      position: absolute;
      width: 10px;
      height: 10px;
      top: 8px;
      right: 8px;
      border-radius: 50%;
    }
    &:hover,
    &.active {
      border-color: var(--outline-color);
      color: var(--text-a);
    }
    &.active {
      background-color: var(--outline-color);
      span {
        border-color: var(--outline-color);
      }
    }
  }

  #btn-collapse-sidemenu {
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 35px;
    height: 35px;
    padding: 5px;
    box-sizing: border-box;
    background-color: transparent;
    border: none;
    border-radius: 5px;
  }
  .botao-ham span {
    background-color: var(--text-b);
  }
  .header-button {
    i {
      color: var(--navs-bg);
      transition: color 0.2s ease;
    }
    :hover i {
      color: var(--text-a);
    }
  }

  @media (min-width: 766px) {
    .btn-notify i {
      font-size: 15px;
    }
    #btn-collapse-sidemenu {
      background: var(--accent-color-opacity);
    }
    #btn-collapse-sidemenu:hover {
      background: var(--accent-color);
    }

    #btn-collapse-sidemenu:hover span {
      background: var(--navs-bg);
    }
    .menu-container {
      width: 100%;
      padding: 0 15px;
      transition: padding 0.2s ease;
    }
    .botao-ham {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: calc(100% + 10px);
      transition: transform 0.2s ease;
    }

    .botao-ham span {
      display: flex;
      width: 18px;
      height: 2px;
      margin-bottom: 5px;
      position: relative;
      background: var(--accent-color);
      border-radius: 3px;
      transition: width 0.2s ease;
    }

    .botao-ham.active span {
      -webkit-transform: none;
      transform: none !important;
      opacity: 1;
    }

    .botao-ham.active span {
      transform: none;
      margin-bottom: 5px;
    }

    .botao-ham.active span:nth-last-child(2) {
      opacity: 1;
      transform: none;
    }

    .botao-ham.active span:nth-last-child(3) {
      opacity: 1;
      transform: none;
    }
    #btn-collapse-sidemenu:active .botao-ham span {
      width: 14px;
    }
    #btn-collapse-sidemenu:active {
      transform: scale(0.98);
    }

    .botao-ham span:last-child {
      margin-bottom: 0;
    }

    body.toggle-sidemenu & #btn-collapse-sidemenu .botao-ham span {
      width: 6px;
    }
    body.toggle-sidemenu & #btn-collapse-sidemenu:active .botao-ham span {
      width: 12px;
    }
  }
`;
