import styled, { createGlobalStyle } from "styled-components";

export const AccessGlobalStyle = createGlobalStyle`
  :root {
    --bg-login: #fcfcfc;
  }
  body{
    background: linear-gradient(
        45deg,
        rgba(6, 52, 15, 1) 0%,
        rgba(28, 136, 50, 1) 50%,
        rgba(147, 255, 169, 1) 100%
      ),
      rgb(6, 52, 15);
    background-attachment: fixed;
  }
`;

export const StyledAccess = styled.main`
  .access-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 95vh;
    padding: 10px 0;
  }
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 30px;
    width: 95vw;
    max-width: 400px;
    border-radius: 10px;
    background: var(--bg-login);
    border: 1px solid var(--outline-color);
    box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.2);
    row-gap: 30px;
  }
  .signup-form {
    align-items: initial;
    padding: 30px;
    padding-bottom: 100px;
    position: relative;
  }
  .form-destaque-grid .form,
  .login-form form {
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: 12px;
    position: relative;
  }
  
  .pwrst-link {
    font-weight: 500;
    color: var(--accent-color);
    text-decoration: none;
    font-size: 10pt;
  }
  .pwrst-link:hover {
    text-decoration: underline;
  }
  .logo-login {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 40px;
  }
  .logo-login .logo {
    width: 110px;
    height: 40px;
  }
  
  .registre-se {
    display: flex;
    font-size: 13px;
    align-items: center;
    justify-content: center;
    width: 100%;
    column-gap: 5px;
  }
  .bt-cadse {
    display: flex;
    color: var(--accent-color);
    font-weight: 600;
    border: none;
  }
  .bt-cadse:hover {
    color: var(--accent-color-active);
  }

  .header-signup {
    display: flex;
    justify-content: space-between;
  }
  .logo-signup {
    width: 100%;
    max-width: 100px;
  }
  .logo-signup:hover, .logo-login:hover {
    filter: grayscale(0.5);
  }
  .progress {
    display: flex;
    align-items: center;
    column-gap: 10px;
    transition: all 0.5s ease;
  }
  .progress > span {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 10px;
    background: var(--outline-color);
    transition: width .4s ease, background .4s ease;
  }
  .progress > span.active {
    background: var(--accent-color-active);
    width: 20px;
  }
  .progress > span.done {
    background: var(--accent-color);
  }
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .input-group.no-wrap{
    flex-direction: row;
  }
  .desc {
    margin-top: 0;
    margin-bottom: 10px;
    color: #052a0c;
    font-weight: 600;
    font-size: 22px;
  }
  .desc::before {
    content: "\f105";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    color: var(--accent-color);
    padding-right: 5px;
  }
  .destaque {
    display: none;
  }
  .flex-btn-next {
    display: flex;
  }
  .btn-next {
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: 100ms linear;
    user-select: none;
    color: var(--accent-color);
  }
  .btn-next .next-arrow{
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 30px;
    margin-left: 5px;
    background: var(--accent-color);
    transition: 100ms linear;
  }
  .btn-next:not(:disabled):hover {
    color: var(--accent-color-active);
  }
  .btn-next:not(:disabled):hover .next-arrow {
    background: var(--accent-color-active);
  }
  .btn-next:not(:disabled):active {
    color: var(--accent-color-active);
  }
  .btn-next:not(:disabled):active .next-arrow{
    transform: translateX(3px);
    background: var(--accent-color-active);
  }
  .flex-btn-login {
    display: flex;
  }
  .btn-login {
    padding: 10px;
    color: var(--accent-color);
    font-size: 14px;
    text-decoration: none;
    font-weight: 500;
  }
  .bottom-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 30px;
    width: 100%;
  }

  @media (min-width: 766px) {
    .login-form {
      padding: 50px;
      border-radius: 15px;
    }
    .form-destaque-grid {
      display: grid;
      grid-template-columns: 1.3fr 1fr;
    }
    .form-destaque-grid .form form {
      padding: 0 10px;
    }
    .signup-form {
      max-width: 750px;
      padding-bottom: 109px;
    }
    .signup-form form {
      flex-grow: 3;
    }
    .logo-signup {
      max-width: 150px;
      height: 40px;
    }
    .imagem-destaque,
    .form-destaque-grid .destaque {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }
    .form-destaque-grid .destaque {
      max-width: 280px;
      min-height: 355px;
      animation: slide-left 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .form-destaque-grid .destaque span {
      padding: 0 40px;
      margin-top: 40px;
      text-align: center;
      font-size: 15px;
      font-weight: 500;
      color: #5a5c54;
    }
    .imagem-destaque img {
      width: 75%;
    }
    .input-group {
      flex-direction: row;
    }
    .bottom-actions {
      padding: 30px 50px;
    }
  }
`;
