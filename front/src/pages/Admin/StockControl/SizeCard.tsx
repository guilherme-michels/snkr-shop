import clsx from "clsx";
import { PropsWithChildren } from "react";

interface SizeCardProps {
  value: number;
  inStock: boolean;
}

export function SizeCard(props: PropsWithChildren<SizeCardProps>) {
  return (
    <div
      className={clsx(
        "p-2 w-10 rounded flex flex-col items-center shadow-md shadow-zinc-400 cursor-pointer text-zinc-700  text-sm",
        {
          "bg-zinc-100 hover:bg-[#e64d7d] transition-all hover:text-zinc-300":
            props.inStock === true,
          "opacity-20 cursor-not-allowed bg-zinc-100": props.inStock === false,
        }
      )}
    >
      {props.value}
    </div>
  );
}
