export type GeneralStore = {
  darkMode: boolean;
  adminPanelOpened: boolean;
  cashierPanelOpened: boolean;
  setLightMode: () => void;
  setDarkMode: () => void;
  sideBarOpened: boolean;
  toggleSideBar: () => void;
  toggleAdminPanel: () => void;
  toggleCashierPanel: () => void;
  toggleDarkMode: () => void;
  closeAdminPanel: () => void;
  closeCashierPanel: () => void;
  openSideBar: () => void;
  closeSideBar: () => void;
};
