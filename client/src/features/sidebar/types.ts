import { LucideProps } from "lucide-react";
import { ReactNode } from "react";

export interface SideBarProps {
  heading: string;
  headingHref: string;
  sections: SideBarSection[];
}

export interface SideBarSection {
  section: string;
  items: SideBarItem[];
}

export interface SideBarItem {
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  href: string;
  children: ReactNode[];
}
