import styled from "styled-components";

interface TabsMenuProps {
  isOnTop?: boolean;
  sticky?: boolean;
  size?: "small" | "medium" | "large";
}

export const TabsMenuStyle = styled.div<TabsMenuProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  position: ${(props) => (props.sticky ? "sticky" : "initial")};
  z-index: 10;
  top: var(--top-bar-height);
  .spacer {
    background: var(--bg-body);
    display: none;
  }

  .tabs-menu-container {
    display: flex;
    border-radius: 5px;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    height: ${(props) =>
      (props.size === "large" && "65px") ||
      (props.size === "medium" && "50px") ||
      (props.size === "small" && "45px") ||
      "65px"};
    align-items: center;
    font-size: ${(props) =>
      (props.size === "large" && "16px") ||
      (props.size === "medium" && "14px") ||
      (props.size === "small" && "13px") ||
      "16px"};
    background: var(--navs-bg);
    font-weight: 500;
    box-shadow: ${(props) =>
      (props.style?.boxShadow && props.style?.boxShadow) ||
      "0 1px 2px rgb(0 0 0 / 10%)"};
  }

  ul {
    display: flex;
    list-style: none;
    height: 100%;
    column-gap: 5px;
    overflow: hidden;
    white-space: nowrap;
  }
  .react-horizontal-scrolling-menu--wrapper {
    width: 100%;
  }
  .react-horizontal-scrolling-menu--inner-wrapper{
    flex: 1;
  }
  .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }

  .react-horizontal-scrolling-menu--scroll-container {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    height: initial;
  }
  @media (min-width: 766px) {
    z-index: ${(props) => (props.isOnTop ? "10" : "4")};
    padding: ${(props) => (props.isOnTop ? "0" : "0 30px")};
    width: calc(100vw - 280px);
    body.toggle-sidemenu & {
      width: calc(100vw - 80px);
    }

    &.ontop {
      z-index: 10;
    }

    .spacer {
      display: block;
      height: 20px;
    }

    .tabs-menu-container {
      border-radius: ${(props) => (props.isOnTop ? "0" : "5px")};
      padding-left: 10px;
      width: 100%;
    }

    &.ontop .tabs-menu-container {
      margin: 0;
      border-radius: 0;
    }
  }
`;

export const TabsMenuItemStyle = styled.li`
  display: flex;
  align-items: center;
  height: 100%;
  width: fit-content;
  a {
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-radius: 2px;
    text-decoration: none;
    border: 2px solid transparent;
    position: relative;
    height: 100%;
    color: var(--text-a);
    transition: font 0.2s ease-in;
  }
  a::after {
    content: " ";
    width: 100%;
    height: 0;
    background-color: var(--accent-color);
    position: absolute;
    bottom: -2px;
    left: 0;
    transition: height 0.2s ease-in;
  }
  a span {
    padding: 0 6px;
    background: var(--primary-bg);
    color: var(--accent-color);
    border-radius: 5px;
    font-weight: 500;
    margin-left: 5px;
  }
  a.active {
    /* background: #f7f7f7; */
    color: var(--accent-color);
  }
  a.active::after {
    height: 2px;
  }
  a.active span {
    background: var(--accent-color);
    color: #fff;
  }
  a:hover {
    background-color: var(--primary-bg);
  }
`;
