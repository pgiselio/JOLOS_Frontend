import styled from "styled-components";

export const ProfilePicFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  .controls {
    display: flex;
    gap: 3px;
    align-items: center;
    justify-content: center;
    margin: 5px 0;
    button {
      background-color: transparent;
      border: none;
      font-size: 15px;
      color: var(--text-a);
      border-radius: 5px;
      width: 30px;
      height: 30px;
      transition: transform 0.2s ease;
      :hover {
        background-color: var(--secondary-color);
        color: var(--inside-accent-color);
      }
      :active {
        transform: scale(0.95);
      }
    }
    .zoom {
      display: flex;
      align-items: center;
      gap: 3px;
    }
  }
  .select-new {
    justify-content: flex-start;
    margin-top: 5px;
    background-color: transparent;
    border-color: transparent;
    padding: 3px 8px;
    color: var(--text-b);
    font-weight: 600;
    font-size: 13.5px;
    gap: 8px;
    border-radius: 10px;
    width: 100%;
    i {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--secondary-color);
      font-size: 12px;
      color: #ffffff;
      width: 33px;
      height: 33px;
      border-radius: 50%;
      transition: all 0.2s ease;
    }
    :hover {
      color: var(--inside-accent-color);
      i {
        color: var(--inside-accent-color);
        background-color: var(--secondary-color);
      }
    }
  }
`;
