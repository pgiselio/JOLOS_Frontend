import styled from "styled-components";

export const ProfilePageStyle = styled.section`
  .profile-page-header {
    display: flex;
    padding: 20px 15px;
    z-index: 5;
    background: var(--primary-bg);
    box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
  }

  .profile-page-header.sticky {
    position: sticky;
    top: 0;
  }

  .profile-page-header-container {
    display: grid;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    gap: 15px;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .profile-pic {
      width: 80px;
      height: 80px;
    }
  }
  .profile-page-info {
    display: flex;
    margin-top: 15px;
    width: 100%;
    .labelDatas {
      display: flex;
      flex: 1;
      gap: 20px;
      column-gap: 60px;
      flex-wrap: wrap;
      margin: 10px 0;
    }
  }
  .profile-description {
    font-size: 14px;
    white-space: pre-wrap;
  }
  .user-actions {
    display: flex;
    flex-direction: column;

    gap: 10px;
    width: 100%;
  }

  .user-actions button {
    width: 100%;
  }

  .profile-names {
    margin-top: 10px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: calc(100% - 60px);

    h2 {
      display: flex;
      justify-content: center;
      font-size: 20px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    span{
      display: flex;
      justify-content: center;
      font-family: "Roboto", sans-serif;
      font-size: 15px;
      font-weight: 500;
      color: var(--text-b);
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    & > * {
      list-style: none;
    }
  }

  .essential-info {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    gap: 10px;
    li a {
      display: flex;
      align-items: center;
      width: 100%;
      span {
        display: flex;
        width: calc(100% - 25px);
        overflow-wrap: anywhere;
      }
      i {
        display: flex;
        width: 25px;
      }
    }
  }
  .social-info {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    li {
      display: flex;
      a {
        padding: 10px;
        border-radius: 30px;
        color: var(--accent-color);
        &:hover {
          background: var(--accent-color-opacity);
        }
        i {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          height: 30px;
          width: 30px;
        }
      }
    }
  }
  .no-about-message {
    padding-top: 30px;
  }
  .no-about-message::before {
    content: ":(";
    font-family: "Roboto";
  }

  @media (min-width: 766px) {
    .profile-page-header {
      padding: 35px 40px;
      padding-top: 125px;
    }
    .user-actions {
      flex-direction: row-reverse;
      justify-content: flex-start;
    }
    .user-info .profile-pic {
      width: 130px;
      height: 130px;
    }
  }
`;
