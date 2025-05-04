import { create } from "zustand";
import { SideBarItem, SideBarProps } from "./types";

interface SidebarStore {
  isOpen: boolean;
  activeItem?: SideBarItem;
  sidebarProps?: SideBarProps;

  setSidebarProps: (sidebarProps: SideBarProps) => void;
  setActiveItem: (item: SideBarItem | undefined) => void;
  toggleSidebar: () => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  isOpen: true,
  sidebarProps: undefined,
  activeItem: undefined,

  setSidebarProps: (sidebarProps) =>
    set(() => ({
      sidebarProps: sidebarProps,
    })),

  setActiveItem: (item) =>
    set(() => ({
      activeItem: item,
    })),

  toggleSidebar: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),
}));
