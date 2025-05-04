import React from "react";
import Logo from "@/assets/logo.svg";
import { Link } from "react-router";
import { useSidebar } from "./store";
import { cn } from "@/lib/utils";

const SideBar: React.FC = () => {
  const { sidebarProps, activeItem, isOpen } = useSidebar();

  return (
    <aside
      className={cn(
        "h-screen border border-gray-200 flex flex-col gap-4",
        isOpen ? "w-[20rem] p-4" : "w-fit px-2 py-4"
      )}
    >
      <section>
        <Link
          to={sidebarProps?.headingHref ?? "/"}
          className={cn(
            "mb-4 flex gap-4 items-center",
            isOpen ? "" : "justify-center"
          )}
        >
          <img src={Logo} alt="" width={isOpen ? 35 : 40} />

          {isOpen && (
            <h1 className="text-2xl font-semibold tracking-tight text-balance text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              <span className="">{sidebarProps?.heading}</span>
            </h1>
          )}
        </Link>
      </section>

      <section>
        {sidebarProps?.sections.map((section) => (
          <div key={section.section} className="grid gap-4">
            {isOpen && (
              <span className="text-poppins text-gray-500 text-sm">
                {section.section}
              </span>
            )}

            <div className="flex flex-col gap-4">
              {section.items.map((item) => (
                <Link
                  to={item.href}
                  key={item.title}
                  className={cn(
                    "flex py-2 px-4 gap-4 rounded-lg items-center justify-start text-sm hover:bg-blue-50 text-poppin",
                    item == activeItem
                      ? "text-blue-500 bg-blue-50"
                      : "text-gray-500"
                  )}
                >
                  {<item.icon />}
                  {isOpen && (
                    <span
                      className={cn(
                        item == activeItem ? "text-blue-700" : "text-gray-700"
                      )}
                    >
                      {item.title}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </aside>
  );
};

export default SideBar;
