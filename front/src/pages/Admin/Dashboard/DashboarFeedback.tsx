import { CaretDoubleUp, CaretDoubleDown } from "phosphor-react";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { getWeekSales } from "../../../api/product/product.service";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { format, subDays } from "date-fns";

interface Sale {
  id: string;
  valor: number;
  data: string;
  productId: string;
  userId: string;
}

interface DashboardFeedbackProps {
  title: string;
}

export function DashboardFeedback(
  props: PropsWithChildren<DashboardFeedbackProps>
) {
  const [weekSales, setWeekSales] = useState<Sale[]>([]);

  const fetchSales = useCallback(() => {
    getWeekSales().then((data) => {
      setWeekSales(data.sales);
    });
  }, []);

  useEffect(() => {
    fetchSales();
  }, []);

  const last7Days = Array.from({ length: 7 }, (_, index) =>
    format(subDays(new Date(), index), "yyyy-MM-dd")
  );

  const formattedData = last7Days
    .map((day) => {
      const salesCount = weekSales.filter(
        (sale) => format(new Date(sale.data), "yyyy-MM-dd") === day
      ).length;
      return {
        name: format(new Date(day), "EEEE"),
        Sales: salesCount,
      };
    })
    .reverse();

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
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={formattedData}>
            <Bar dataKey="Sales" fill="#2b2b2b" />
            <XAxis dataKey="name" />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
