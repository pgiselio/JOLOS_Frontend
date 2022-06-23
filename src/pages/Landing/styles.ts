import styled, { createGlobalStyle } from "styled-components";

export const LandingGlobalStyle = createGlobalStyle`
  body{
    background-color: #ffffff;
  }
`;
export const LandingHeader = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  margin-bottom: 200px;
  z-index: 5;
  .logo-nav {
    display: flex;
    align-items: center;
    margin-left: 12px;
    z-index: 2;
  }
  .logo-nav:hover {
    filter: grayscale(0.5);
  }
  .logo-nav img {
    height: 34px;
  }
  .navigate {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80px;
    background: var(--navs-bg);
  }

  .menu-container {
    display: flex;
    width: 95vw;
    justify-content: space-between;
  }

  .menu {
    position: absolute;
    background: #ffffff;
    box-shadow: 5px 5px 6px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    top: 78px;
    left: 0;
    transition: height 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    height: 0;
    pointer-events: none;
    user-select: none;
    max-height: calc(100vh - 80px);
    overflow: hidden;
    overflow-y: auto;
  }

  .menu.active {
    height: 320px;
    pointer-events: initial;
  }
  .menu ul {
    display: flex;
    flex-direction: column;
    padding: 30px;
    padding-top: 0;
    display: flex;
  }
  .menu li {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
  }

  .menu li a {
    text-align: center;
    width: 100%;
    padding: 15px;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    color: var(--accent-color);
  }

  .menu li a:hover {
    background: var(--accent-color);
    color: #fff;
    border-color: var(--accent-color);
  }
  .acesso {
    display: none;
  }
  .acesso-mobile {
    display: flex;
    flex-direction: column;
    position: absolute;
    justify-content: center;
    background: #ffffff;
    box-shadow: 5px 5px 6px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    top: 78px;
    left: 0;
    height: 0;
    transition: all 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    pointer-events: none;
    user-select: none;
    max-height: calc(100vh - 80px);
    overflow: hidden;
  }
  .acesso-mobile a {
    text-align: center;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    color: var(--accent-color);
    margin-left: initial;
    margin-bottom: 10px;
  }
  .acesso-mobile.active {
    height: 170px;
    padding: 30px;
    pointer-events: initial;
  }

  .mobile-buttons {
    display: flex;
    align-items: center;
    column-gap: 10px;
    z-index: 1;
  }
  .access-bt {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: transparent;
    gap: 10px;
    z-index: 1;
    border: none;
    padding: 10px;
    transition: all 0.2 ease;
    border-radius: 10px;
  }
  .access-bt:hover {
    background: var(--accent-color-opacity);
  }
  .access-bt::before {
    content: "\f007";
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
    width: 13px;
    height: 13px;
    padding: 6px;
    border: 2px solid #000;
    border-radius: 30px;
    color: #000;
    color: #333;
    border-color: #333;
    transition: all 0.2s linear;
    z-index: 1;
  }
  .access-bt.active::before {
    color: #eaffef;
    border-color: var(--accent-color);
    background-color: var(--accent-color);
  }

  .login-bt,
  .signup-bt {
    text-decoration: none;
    color: var(--accent-color);
    font-size: 15px;
    padding: 8px 20px;
    font-weight: 500;
    transition: 0.1s linear;
  }

  .login-bt:hover {
    color: var(--accent-color-active);
  }

  .signup-bt {
    border: 2px solid var(--accent-color);
    border-radius: 6px;
    margin-left: 15px;
  }

  .signup-bt:hover {
    color: #fff;
    background: var(--accent-color);
  }

  @media (min-width: 766px) {
    .access-bt {
      cursor: pointer;
    }
    .logo-index {
      margin-left: initial;
    }
    .mobile-buttons {
      display: none;
    }
    .menu-container {
      height: 100%;
    }
    .menu,
    .menu ul {
      transform: none;
      padding-top: 30px;
      flex-direction: row;
      position: relative;
      background: initial;
      box-shadow: none;
      width: initial;
      padding: initial;
      top: initial;
      left: initial;
      pointer-events: initial;
      height: 100%;
    }

    .menu.active {
      height: initial;
      pointer-events: initial;
    }

    .menu,
    .acesso {
      display: flex;
      align-items: center;
    }

    .menu li {
      display: flex;
      padding: 0 5px;
      position: relative;
      margin-top: initial;
      height: 100%;
    }

    .menu li a {
      text-decoration: none;
      color: #202020;
      font-weight: 500;
      height: 100%;
      width: initial;
      text-align: center;
      border: none;
      font-size: initial;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .menu li a:hover {
      color: var(--accent-color);
      background: initial;
    }

    .menu li a.active {
      color: var(--accent-color);
      background: initial;
    }

    .menu li a::after {
      content: " ";
      width: 0;
      height: 4px;
      border-radius: 10px;
      display: block;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      background: var(--accent-color);
      transition: 0.13s linear;
    }
    .menu li a:hover::after {
      width: calc(100% - 20px);
    }
  }
`;
export const LandingStyle = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 1280px;
  }
  main.landing-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 90px;
    section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 300px;
    }
    section.hello-section {
      max-height: calc(100vh - 150px);
      height: 100vh;
      width: 100%;
      color: #333;
      text-align: center;
      background-size: cover;
      .container{
        height: 100%;
        padding: 30px;
        align-self: center;
      }
      .parallax{
        height: 100%;
        .layer-1{
          display: flex;
          justify-content: center;
        }
      }

      h1 {
        font-size: clamp(1.5rem, 2.5vw, 2.5em);
        max-width: 75%;
        font-weight: 500;
      }
      h2 {
        display: none;
        font-size: 1.2em;
        max-width: 70%;
        font-weight: 400;
      }
      p {
        text-align: center;
        max-width: clamp(70%, 400px, 500px);
        font-size: clamp(0.8rem, 1.5vw, 1em);
        color: #666;
      }
    }
  }

  footer.landing-footer {
    margin-top: 100px;
    height: 500px;
    display: flex;
    background: #810016;
  }
  .custom-bg {
    height: 100%;
  }

  .backshadow {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    z-index: 1;
  }
  .backshadow.active {
    display: block;
  }
`;
