import styled from "styled-components";

export const LandingStyle = styled.div`
  main.landing-main {
    margin-top: 80px;
  }

  main.landing-main section {
    height: 50vh;
    background: #f1f1f1;
  }
  
  main.landing-main section:first-child{
    padding-top: 90px;
    background: var(--accent-color-active);
    min-height: calc(100vh);
  }
  main.landing-main section:nth-child(2){
    padding-top: 90px;
    background: var(--accent-color);
    min-height: calc(100vh);
  }
  main.landing-main section:nth-child(3){
    padding-top: 90px;
    background: var(--text-b);
    min-height: calc(100vh);
  }
  main.landing-main section:nth-child(2){
    padding-top: 90px;
    background: var(--accent-color);
    min-height: calc(100vh);
  }

  footer.landing-footer {
    margin-top: 100px;
    height: 500px;
    display: flex;
    background: #810016;
  }
  .navigate-container {
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
    margin-bottom: 200px;
    z-index: 5;
  }
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
    height: 40px;
    width: 110px;
  }
  .navigate {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80px;
    background: #fffffff0;
    border-bottom: 1px solid #cccc;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
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
    transition: all .2 ease;
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
  .backshadow{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    z-index: 1;
  }
  .backshadow.active{
    display: block;
  }

  @media (min-width: 766px) {
    .access-bt{
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
