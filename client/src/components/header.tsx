import { useAuthStore } from "@/features/auth/store";
import { useSidebar } from "@/features/sidebar/store";
import {
  ChevronRightIcon,
  Columns2Icon,
  SearchIcon,
  ShoppingCartIcon,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useSignOff } from "@/features/auth/api/mutations";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { useCartDrawer } from "@/features/cart/store";

const Header = () => {
  const { toggleSidebar } = useSidebar();
  const { isAuthenticated, user } = useAuthStore();
  const { mutate: signOff } = useSignOff();
  const { setIsOpen, isOpen } = useCartDrawer();
  const navigate = useNavigate();

  return (
    <header className="p-4 border-y-1 border-gray-200 w-full">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-4">
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
        </div>

        {isAuthenticated ? (
          <div
            className={cn(
              "flex gap-8 py-2 px-4 rounded-lg",
              user?.role == "Admin" ? "" : "border"
            )}
          >
            {user?.role == "User" && (
              <button onClick={() => setIsOpen(true)}>
                <ShoppingCartIcon
                  className={cn(isOpen ? "text-blue-500" : "text-gray-500")}
                />
              </button>
            )}

            <Popover>
              <PopoverTrigger>
                {user?.profile ? (
                  <img
                    className="w-8 h-8 bg-cover rounded-full cursor-pointer font-semibold"
                    src={`http://localhost:8000${user.profile}`}
                  />
                ) : (
                  <div className="w-8 h-8 bg-cover rounded-full bg-primary-foreground cursor-pointer"></div>
                )}
              </PopoverTrigger>
              <PopoverContent className="w-60 p-4 absolute -right-8 top-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    {user?.profile ? (
                      <img
                        className="w-10 h-10 bg-cover rounded-full cursor-pointer"
                        src={`http://localhost:8000${user.profile}`}
                      />
                    ) : (
                      <div className="w-10 h-10 bg-cover rounded-full bg-primary-foreground cursor-pointer"></div>
                    )}
                    <p className="font-medium">{user?.name}</p>
                  </div>

                  <Separator />

                  <div className="flex flex-col gap-4">
                    <p className="pl-6 p-2 hover:bg-primary-foreground text-sm text-muted-foreground">
                      {user?.email}
                    </p>

                    {user?.company && (
                      <p className="pl-6 p-2 hover:bg-primary-foreground text-sm text-muted-foreground">
                        {user?.company}
                      </p>
                    )}
                  </div>

                  <Separator />

                  <Button
                    onClick={() => {
                      signOff();
                      navigate("/");
                    }}
                    className="font-semibold text-gray-500 -my-2 text-sm"
                    variant={"ghost"}
                  >
                    Sign Out <ChevronRightIcon />
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            onClick={() => navigate("/auth/sign-in")}
            className="font-semibold text-gray-500"
            variant={"ghost"}
          >
            Sign in <ChevronRightIcon />
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
