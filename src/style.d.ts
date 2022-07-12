import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    name: string;
    borderRadius?: string;
    pallets?: {
      [name: string]: {
        [i: number]: string;
      };
    };
    colors: {
      main: string;
      mainActive: string;
      insideMain: string;
      secondary: string;
      bodyBackground: string;
      primaryBg: string;
      secondaryBg: string;
      systemMenu: {
        border: string;
        background: string; // use only RGB "inside" values. e.g.: rgb(THIS)
        linkActive: string;
        linkHover: string;
        linkOnClick: string;

        icon: string;
      };
      textA: string;
      textB: string;
      textC: string;
      outlineColor: string;
    };
  }
}
