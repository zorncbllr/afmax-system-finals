import { useSidebar } from "@/features/sidebar/store";
import { Columns2Icon, SearchIcon } from "lucide-react";

const Header = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="p-4 border-y-1 border-gray-200 w-full">
      <nav className="flex gap-4">
        <button
          onClick={toggleSidebar}
          className="border cursor-pointer border-gray-200 w-fit p-2 rounded-lg"
        >
          <Columns2Icon className="text-gray-500" />
        </button>

        <section>
          <div className="block">
            <form>
              <div className="relative">
                <span className="absolute top-1/2 left-4 -translate-y-1/2">
                  <SearchIcon size={20} className="text-gray-500" />
                </span>
                <input
                  type="text"
                  placeholder="Search or type command..."
                  id="search-input"
                  className="shadow-theme-xs focus:border-brand-300 focus:ring-blue-50 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:outline-hidden xl:w-[430px]"
                />

                <button
                  id="search-button"
                  className="absolute top-1/2 right-2.5 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500"
                >
                  <span> ⌘ </span>
                  <span> K </span>
                </button>
              </div>
            </form>
          </div>
        </section>
      </nav>
    </header>
  );
};

export default Header;
