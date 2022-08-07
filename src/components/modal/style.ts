import Dialog from "@reach/dialog";
import styled from "styled-components";



export const ModalStyle = styled(Dialog)`
  /* min-width: 600px; */
  width: fit-content;
  margin: 5vh auto;
  background: var(--primary-bg);
  padding: 0;
  outline: none;
  border-radius: 5px;
  animation: slide-up 0.3s ease-in-out;
  .box-title {
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 3;
  }
  .close-button {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    background: transparent;
    border: none;
    cursor: pointer;

    & .attention {
      animation: zoomAndShake 2s linear infinite;
    }
  }
  .close-button i {
    font-size: 17px;
    color: var(--text-a);
  }
  .close-button:hover i {
    color: red;
  }
  @keyframes zoomAndShake {
    0% {
      -webkit-transform: rotate(-15deg);
      transform: rotate(-15deg);
    }
    4% {
      -webkit-transform: rotate(15deg);
      transform: rotate(15deg);
    }
    8%,
    24% {
      -webkit-transform: rotate(-18deg) scale(1.5);
      transform: rotate(-18deg) scale(1.5);
      color: red;
    }
    12%,
    28% {
      -webkit-transform: rotate(18deg) scale(1.5);
      transform: rotate(18deg) scale(1.5);
      color: red;
    }
    16% {
      -webkit-transform: rotate(-22deg);
      transform: rotate(-22deg);
    }
    20% {
      -webkit-transform: rotate(22deg);
      transform: rotate(22deg);
    }
    32% {
      -webkit-transform: rotate(-12deg);
      transform: rotate(-12deg);
    }
    36% {
      -webkit-transform: rotate(12deg);
      transform: rotate(12deg);
    }
    40%,
    to {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
  }
  @media (max-width: 700px) {
    margin: 0;
    min-width: initial;
    position: relative;
    width: 100vw;
    max-height: initial;
    min-height: 100vh;
    padding-bottom: 100px;
  }
`;

export const ModalBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  width: 100%;
  padding-top: 10px;
  @media (max-width: 700px) {
    position: fixed;
    bottom: 0;
    padding: 20px;
    right: 0;
    left: 0;
    border-top: 1px solid var(--outline-color);
    background-color: var(--primary-bg);
  }
`
