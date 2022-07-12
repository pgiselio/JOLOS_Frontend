import { themes } from "../../styles/themes";

export interface AppOptionsContextType {
  theme: string;
  setTheme: (theme: keyof typeof themes) => void;
  sidebarState: boolean;
  toggleSidebar: () => void;
};
