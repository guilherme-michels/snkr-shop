import clsx from "clsx";
import { Smiley, SmileyMeh, SmileySad } from "phosphor-react";
import { PropsWithChildren, useEffect } from "react";

import { PieChart } from "react-minimal-pie-chart";

interface DashboardCardProps {
  title: string;
  expected?: number;
  reached?: number;
  chartColor?: string;
  chart: boolean;
  nps?: number;
}

export function DashboardCard(props: PropsWithChildren<DashboardCardProps>) {
  return (
    <div className="bg-bglight p-8 w-[31%] rounded flex flex-col text-zinc-700 items-center shadow-md shadow-zinc-400">
      <strong className="text-xl">{props.title}</strong>
      <div>
        {props.chart ? (
          <PieChart
            className="mt-4"
            animate={true}
            totalValue={props.expected}
            startAngle={270}
            background="#1a1a1a"
            labelPosition={1}
            data={[
              {
                title: props.title,
                value: props.reached!,
                color: props.chartColor!,
              },
            ]}
          />
        ) : (
          <div
            className={clsx(
              "mt-4 flex flex-col items-center w-full justify-center",
              {
                "text-red": props.nps! >= 0 && props.nps! < 40,
                "text-yellow": props.nps! >= 40 && props.nps! < 75,
                "text-green": props.nps! >= 75,
              }
            )}
          >
            {props.nps! >= 0 && props.nps! < 40 ? (
              <div className="flex flex-col items-center text-xl mt-12">
                <SmileySad size={120} />
                Don't give up
              </div>
            ) : null}

            {props.nps! >= 40 && props.nps! < 75 ? (
              <div className="flex flex-col items-center text-xl mt-12">
                <SmileyMeh size={120} />
                Not bad
              </div>
            ) : null}

            {props.nps! >= 75 ? (
              <div className="flex flex-col items-center text-xl mt-12">
                <Smiley size={120} /> Excellent
              </div>
            ) : null}
          </div>
        )}
      </div>
      {props.expected ? (
        <div className="mt-10 flex justify-around w-full text-sm">
          <div className="font-bold flex items-center">
            <div className="w-5 h-5 bg-[#353343] rounded-full mr-2" />
            Expected (
            {props.expected >= 10000
              ? (props.expected / 1000 + "k").replaceAll(".", ",")
              : props.expected}
            )
          </div>
          <div className="font-bold flex items-center">
            <div
              className="w-5 h-5 rounded-full mr-2"
              style={{ backgroundColor: props.chartColor }}
            />
            Reached (
            {props.reached! >= 10000
              ? (props.reached! / 1000 + "k").replaceAll(".", ",")
              : props.reached}
            )
          </div>
        </div>
      ) : (
        <div className="mt-20 font-bold">NPS Score: {props.nps}</div>
      )}
    </div>
  );
}
