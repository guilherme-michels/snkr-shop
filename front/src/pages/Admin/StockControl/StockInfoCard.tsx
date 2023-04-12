import { PropsWithChildren } from "react";

interface StockInfoCardProps {
  title: string;
  value: number;
  color: string;
}

export function StockInfoCard(props: PropsWithChildren<StockInfoCardProps>) {
  return (
    <div
      style={{ color: props.color }}
      className="bg-bglight p-10 w-[31%] h-[100%] rounded flex flex-col text-zinc-700 items-center shadow-md shadow-zinc-400"
    >
      <strong className="text-5xl">
        {props.value >= 10000
          ? (props.value / 1000 + "k").replaceAll(".", ",")
          : props.value}
      </strong>
      <strong className="text-base mt-12">{props.title}</strong>
    </div>
  );
}
