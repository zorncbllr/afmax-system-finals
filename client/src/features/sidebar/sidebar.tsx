import React from "react";
import Logo from "@/assets/logo.svg";
import { Link } from "react-router";
import { SideBarProps } from "./types";

const SideBar: React.FC<SideBarProps> = ({
  heading,
  headingHref,
  sections,
}) => {
  return (
    <aside className="w-[20rem] h-screen border border-gray-200 p-4 flex flex-col gap-4">
      <section>
        <Link to={headingHref} className="mb-4 flex gap-4 items-center">
          <img src={Logo} alt="" width="35" />
          <h1 className="text-2xl font-semibold tracking-tight text-balance text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            <span className="">{heading}</span>
          </h1>
        </Link>
      </section>

      <section>
        {sections.map((section) => (
          <div className="grid gap-4">
            <span className="text-poppins text-gray-500 text-sm">
              {section.section}
            </span>

            <div className="flex flex-col gap-4">
              {section.items.map((item) => (
                <button className="flex py-2 px-4 gap-4 rounded-lg items-center justify-start text-sm hover:bg-blue-50 text-poppins text-gray-500">
                  {<item.icon />}
                  <span className="text-gray-700">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </aside>
  );
};

export default SideBar;
