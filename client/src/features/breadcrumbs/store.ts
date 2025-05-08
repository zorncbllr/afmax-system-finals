import { create } from "zustand";

export interface BreadcrumbItem {
  href: string;
  itemName: string;
}

interface BreadcrumbStore {
  breadcrumbList: BreadcrumbItem[];
  activePage?: BreadcrumbItem;

  setBreadcrumbList: (breadcrumbList: BreadcrumbItem[]) => void;
  setActivePage: (activePage: BreadcrumbItem) => void;
}

export const useBreadcrumb = create<BreadcrumbStore>((set) => ({
  breadcrumbList: [],
  activePage: undefined,

  setBreadcrumbList: (breadcrumbList) => set(() => ({ breadcrumbList })),

  setActivePage: (activePage) => set(() => ({ activePage })),
}));
