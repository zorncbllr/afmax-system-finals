import { create } from "zustand";
import { SideBarItem, SideBarProps } from "./types";

interface SidebarStore {
  activeItem?: SideBarItem;
  sidebarProps?: SideBarProps;

  setSidebarProps: (sidebarProps: SideBarProps) => void;
  setActiveItem: (item: SideBarItem | undefined) => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
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
}));
