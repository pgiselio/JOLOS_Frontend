import { createGlobalStyle } from "styled-components";

export const SysGlobalStyle = createGlobalStyle`
:root{
  --top-bar-height: 50px;
}
  .sys-grid-container {
  display: grid;
  grid-template-areas: "menu main";
  position: relative;
  width: 100%;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  padding-top: var(--top-bar-height);
}
/* Main content */
.main {
  grid-area: main;
  position: relative;
  background: var(--bg-body);
}
.main::before{
  content: "";
  position: fixed;
  top: var(--top-bar-height);
  height: 100%;
  width: 100%;
  border-top: 1px solid;
  border-left: none;
  border-color: ${(props) => props.theme.colors.systemMenu.border} ;
  box-shadow: -3px -3px 0 0 var(--navs-bg);
  z-index: 14;
  pointer-events: none;
}

body.toggle-sidemenu .main {
  pointer-events: none;
}

body.toggle-sidemenu {
  overflow-y: hidden;
}

body.remove-transbar .side-bar, 
body.remove-transbar .side-bar *, 
body.remove-transbar .menu-container , 
body.remove-transbar .three-bars-btn *{
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -ms-transition: none !important;
    -o-transition: none !important;
    transition: none !important;
}

.main main {
  min-height: 100vh;
}

.content-grid {
  display: grid;
  grid-template-areas: "content filter";
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;
  margin-top: 5px;
}

.content {
  grid-area: content;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  max-width: 1280px;
  margin: 0 auto;
}

.spacer {
  height: 30px;
  width: 100%;
  background: #fff;
  position: relative;
  z-index: 11;
}

.cards-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 20px;
}

.filters {
  grid-area: filter;
  width: 250px;
}

.vaga-status {
    color: #b3001e;
    font-weight: 500;
  }
  .vaga-status.enabled {
    color: green;
  }

@media (min-width: 766px) {
  body::-webkit-scrollbar {
    width: 16px;
  }

  body::-webkit-scrollbar-thumb {
    background-color: #a3a3a3d5;
    border-radius: 20px;
    background-clip: content-box;
    border: 6px solid transparent;
  }

  body::-webkit-scrollbar-thumb:hover {
    background-color: #838383d5;
    border-width: 4px;
  }
  body::-webkit-scrollbar-thumb:active {
    background-color: #707070d5;
    border-width: 4px;
  }


  body.toggle-sidemenu .menu-container {
    width: 100%;
    padding: 0 22px;
  }


  .main {
    min-width: initial;
    border-top-left-radius: 10px;
  }
  .main::before{
    border-left: 1px solid;
    border-color: ${(props) => props.theme.colors.systemMenu.border};
    border-top-left-radius: 10px;
  }
  

  body.toggle-sidemenu .main {
    pointer-events: all;
  }

  body.toggle-sidemenu{
    overflow-y: initial;
  }

  .content {
    padding: 0 30px;
  }
  .content-grid {
    margin-top: 30px;
  }
}

@media (min-width: 1000px) {
  .cards-container {
      grid-template-columns: 1fr 1fr;
  }
}
`;
