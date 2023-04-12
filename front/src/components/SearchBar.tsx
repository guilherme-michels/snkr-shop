import clsx from "clsx";
import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";

export function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex items-center rounded mb-2 w-full">
      <MagnifyingGlass
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        color="#696969"
        className={clsx(
          "h-10 w-10 p-1 cursor-pointer hover:opacity-80 transition-all border-solid border-[1px] border-zinc-700",
          {
            "rounded-l-sm": isSearchOpen === true,
            "rounded-sm": isSearchOpen === false,
          }
        )}
      />

      <input
        className={clsx(
          "bg-transparent transition-all h-10 outline-none rounded-r-sm border-solid",
          {
            "w-[29%] border-[1px] border-l-0 placeholder p-2 border-zinc-700":
              isSearchOpen === true,
            "w-0 border-l-0 border-r-0": isSearchOpen === false,
          }
        )}
        placeholder="Search"
      />
    </div>
  );
}
