import styled from "styled-components";
import { Box } from "../../../components/box";

export const Container = styled.section`
  .topics {
    padding: 20px;
    padding-top: 10px;
  }
  .topic {
    & ~ .topic {
      margin-top: 15 px;
      border-top: 1px solid var(--outline-color);
    }
    a {
      display: flex;
      flex-direction: column;
      padding: 10px;
      border-radius: 5px;
      color: var(--text-a);
    }
  }

  .vaga-forum-info {
    h3 {
      font-size: 14px;
      span.topicID {
        font-size: 12px;
        color: var(--text-b);
        font-weight: normal;
      }
    }
    .topic-meta {
      display: flex;
      gap: 5px;
      font-size: 13px;
      color: var(--text-b);
    }
  }
  .last-answer {
    display: flex;
    i {
      color: var(--accent-color);
      transform-origin: center;
      transform: rotate(90deg);
      height: 20px;
      width: 20px;
      min-width: 20px;
      margin-top: 5px;
    }
    .answer-content {
      display: flex;
      margin-left: 5px;
      padding: 10px;
      border-radius: 5px;
      background-color: #81818111;

      .candidato-pic {
        width: 20px;
        min-width: 20px;
        height: 20px;
      }
      .pessoa-forum-info {
        display: flex;
        flex-direction: column;
        margin-left: 5px;

        .name {
          font-size: 12px;
          color: var(--text-a);
        }
        .message {
          color: var(--text-b);
          font-size: 13px;
          line-height: 15px;
          max-height: 30px;
          overflow: hidden;
        }
      }
    }
  }
`;
export const NewAnswer = styled(Box)`
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  button[type="submit"] {
    align-self: flex-end;
  }
  .new-answer-field {
    width: 100%;
    max-width: 100%;
    min-height: 100px;
    resize: vertical;
  }
`;

export const ForumTopic = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
  position: relative;
  .topic-message {
    display: flex;
    flex-direction: column;
    z-index: 2;
  }
  .sender-detail {
    display: flex;
    align-items: center;
    padding: 0 10px;
    gap: 10px;
    span {
      color: var(--text-b);
      font-size: 14px
    }
  }
  .message {
    padding: 10px;
    padding-left: 70px;
    color: var(--text-a);
    font-size: 15px;
  }
  & ~ & {
    border-top: 1px solid var(--outline-color);
  }
  & > &::before{
    content: " ";
    height: 100%;
    width: 2px;
    background-color: var(--outline-color);
    position: absolute;
    left: calc(10px + 25px);
    top: -90%;
    z-index: 1;
  }
`;
