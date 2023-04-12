import { CaretDoubleUp, CaretDoubleDown } from "phosphor-react";
import { PropsWithChildren } from "react";
import WeekChart from "./WeekChart";

interface DashboardFeedbackProps {
  title: string;
}

export function DashboardFeedback(
  props: PropsWithChildren<DashboardFeedbackProps>
) {
  return (
    <div className="flex w-full shadow-md shadow-zinc-400 rounded">
      <div className="p-5 flex flex-col text-zinc-700 w-1/3">
        <strong className="text-2xl">Sales per day in the week</strong>
        <div className="flex items-center mt-4 ">
          <CaretDoubleUp size={24} className="mr-1 text-green" />
          More sales day
        </div>
        <strong className="mt-1 text-base">Saturday</strong>
        <div className="flex items-center mt-4">
          <CaretDoubleDown size={24} className="mr-1 text-red" />
          Less sales day
        </div>
        <strong className="mt-1 text-base">Sunday</strong>
      </div>
      <div className="p-5 rounded flex flex-col text-zinc-700  w-2/3">
        <WeekChart />
      </div>
    </div>
  );
}
