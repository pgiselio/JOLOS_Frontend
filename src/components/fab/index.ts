import styled from "styled-components";

type FabButtonProps = {
  color?: string;
  size?: string;
};

export const FabButton = styled.button<FabButtonProps>`
  display: flex;
  position: fixed;
  bottom: 25px;
  right: 25px;
  align-items: center;
  justify-content: center;
  column-gap: 5px;
  height: ${(props) => (props.size ? props.size : "")};
  width: ${(props) => (props.size ? props.size : "")};
  padding: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  border-radius: 15px;
  transition: 0.1s linear;
  background: ${(props) => (props.color ? props.color : "var(--accent-color)")};
  border: 2px solid ${(props) => (props.color ? props.color : "var(--accent-color)")};
  color: #fff;
  user-select: none;
  z-index: 50;
  animation: fade-appear 0.3s ease;
  span{
      display: flex;
      gap: 5px;
      align-items: center;
  }
  :active{
    transform: scale(.95);
  }
  i.fas,
  i.far,
  i.fa-solid,
  i.fa-regular {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 25px;
  }
  :not(:disabled):hover {
    /* background: var(--accent-color-active); */
    box-shadow: inset 0px 0px 200px 200px #00000047;
    /* border: 2px solid var(--accent-color-active); */
  }
  @keyframes fade-appear {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @media(max-width: 765px){
    cursor: default;
  }
`;
