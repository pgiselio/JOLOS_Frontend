import styled from "styled-components";

export const VagaPageStyle = styled.section`
  .vaga-page-header-container {
    padding: 0;
  }
  .vaga-page-header {
    padding: 5px 20px;
    padding-top: 40px;
    position: relative;
    background-color: var(--navs-bg);
    box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
    .profile-pic {
      width: 50px;
      height: 50px;
    }
    h2 {
      padding-top: 10px;
      color: var(--text-a);
      font-weight: 500;
      font-size: 20px;
      line-height: 30px;
      overflow: hidden;
      word-wrap: break-word;
      text-overflow: ellipsis;
    }

    .subscribe {
      display: flex;
      align-items: end;
      flex-direction: column;

      flex-wrap: wrap;
      gap: 10px;
      justify-content: end;
      .vaga-status {
        color: #b3001e;
        font-weight: 500;
        font-size: 14px;
        padding: 9px 0;
      }
      .vaga-status.enabled {
        color: green;
      }
    }
  }
  .tabs {
    padding: 0;
    overflow: hidden;
    max-width: 100vw;
  }
  .vaga-page-info {
    display: flex;
    margin-top: 10px;
    width: 100%;
  }
  .vaga-page-description {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    word-break: break-all;
    white-space: pre-wrap;
  }
  .vaga-page-description ul,
  ol {
    margin-block-start: 15px;
    margin-block-end: 15px;
    padding-left: 18px;
  }

  .vaga-page-description ul li,
  ol li {
    margin-left: 16px;
  }

  .vaga-page-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }

  .vaga-page-actions > * {
    width: 100%;
  }

  .lista-candidatos .candidato {
    display: flex;
    width: 100%;
    position: relative;
    margin-top: 5px;
  }

  .lista-candidatos .candidato button {
    display: flex;
    width: 100%;
    background: transparent;
    border: none;
  }

  .candidato-group {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    padding-left: 50px;
    position: relative;
    color: var(--text-b);
    width: 100%;
    user-select: none;
  }

  .candidato-group * {
    pointer-events: none;
  }

  #candidato-checkall {
    margin-right: 10px;
  }

  .candidato-list-check {
    display: flex !important;
    position: absolute !important;
    z-index: 2 !important;
    left: 15px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
  }

  .candidato-list-check:checked ~ .candidato-group {
    background: #00ff2e12;
    color: var(--accent-color);
  }

  .candidato-group:hover {
    background: var(--secondary-bg);
  }

  .candidato-pic {
    height: 50px;
    width: 50px;
  }

  .candidato-info {
    display: flex;
    text-align: left;
    flex-direction: column;
    padding-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .candidato-info h3 {
    font-size: 16px;
    font-weight: 600;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .candidato-info span {
    font-weight: 300;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .lista-candidatos-actions {
    align-items: center;
    padding: 10px;
    display: flex;
    justify-content: end;
    .selected-counter {
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      padding-right: 5px;
    }
  }

  .lista-candidatos-actions > * {
    margin-right: 5px;
  }
  .lista-candidatos-actions .btn-down-curriculo {
    background: var(--accent-color);
    color: #fff;
  }

  @media (min-width: 766px) {
    .vaga-page-header {
      padding: 0 40px;
      padding-top: 50px;
      .profile-pic {
        width: 100px;
        height: 100px;
      }
      h2 {
        font-size: 22px;
        max-width: calc(100vw - 280px - 80px);
      }
      .subscribe {
        flex-direction: row;
        align-items: center;

        .vaga-status {
        }
        .vaga-status.enabled {
        }
      }
    }
    .tabs {
      padding: 0 30px;
      border-radius: 0;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      max-width: 1280px;
    }

    .candidato-info h3 {
      font-size: 18px;
    }

    .candidato-info span {
      font-size: 14px;
    }
  }
`;
