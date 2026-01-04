export type GeneralStore = {
  darkMode: boolean;
  setLightMode: () => void;
  setDarkMode: () => void;
  sideBarOpened: boolean;
  toggleSideBar: () => void;
  toggleDarkMode: () => void;
  openSideBar: () => void;
  closeSideBar: () => void;
};
