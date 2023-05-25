import { useCallback, useEffect, useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { DashboardFeedback } from "./DashboarFeedback";
import {
  getMonthSales,
  getWeekSales,
} from "../../../api/product/product.service";

export function DashboardPage() {
  const [weekSales, setWeekSales] = useState(0);
  const [monthSales, setMonthSales] = useState(0);

  const fetchSales = useCallback(() => {
    getWeekSales().then((data) => {
      setWeekSales(data.sales.length);
    });
    getMonthSales().then((data) => {
      setMonthSales(data.sales.length);
    });
  }, [monthSales, weekSales]);

  useEffect(() => {
    fetchSales();
  }, [weekSales, monthSales]);

  return (
    <div className="h-full flex flex-col items-center">
      <div className="flex w-[70%] justify-between">
        <DashboardCard
          title={"NPS"}
          chart={false}
          nps={Number(((weekSales / 160) * 100).toFixed(2))}
        />

        <DashboardCard
          expected={160}
          reached={weekSales}
          title={"Week sales"}
          chart
          chartColor="#b3b3b3"
        />

        <DashboardCard
          expected={640}
          reached={monthSales}
          title={"Month goal"}
          chart
          chartColor="#b3b3b3"
        />
      </div>
      <div className="flex w-[70%] bg-bglight h-56 mt-10">
        <DashboardFeedback title="teste" />
      </div>
    </div>
  );
}
