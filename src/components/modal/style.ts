import Dialog from "@reach/dialog";
import styled from "styled-components";

export const ModalStyle = styled(Dialog)`
  min-width: 600px;
  width: fit-content;
  margin: 5vh auto;
  background: var(--primary-bg);
  padding: 0;
  outline: none;
  border-radius: 5px;
  max-height: 90vh;
  animation: slide-up 0.3s ease-in-out;
  .box {
    margin: 0;
    padding-bottom: 30px;
    position: relative;
    .box-title{
      display: flex;
      justify-content: space-between;
      position: sticky;
      top: 0;
    }
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
    height: 100vh;
    max-height: initial;
  }
`;
