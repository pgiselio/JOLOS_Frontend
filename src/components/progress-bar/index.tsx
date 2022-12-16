import styled from "styled-components";

export default function Progressbar({ progress }: { progress: number }) {
  return (
    <ProgressConatainer className={`${progress > 0 ? "onProgress" : ""}`}>
      <span
        style={{
          transform: `translateX(-${100 - progress}%)`,
        }}
      ></span>
    </ProgressConatainer>
  );
}

const ProgressConatainer = styled.p`
  width: 100%;
  height: 5px;
  background-color: var(--secondary-color);
  border-radius: 10px;
  opacity: 0;
  position: relative;
  overflow: hidden;
  span {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: var(--accent-color);
    transition: transform 0.2s ease;
  }
  &.onProgress {
    opacity: 1;
  }
`;
