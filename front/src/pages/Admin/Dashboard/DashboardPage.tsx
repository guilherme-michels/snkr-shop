import { DashboardCard } from "./DashboardCard";
import { DashboardFeedback } from "./DashboarFeedback";

export function DashboardPage() {
  return (
    <div className="h-full flex flex-col items-center">
      <div className="flex w-[70%] justify-between">
        <DashboardCard title={"NPS"} chart={false} nps={90} />

        <DashboardCard
          expected={543200}
          reached={28000}
          title={"Completed sales"}
          chart
          chartColor="#b3b3b3"
        />

        <DashboardCard
          expected={20}
          reached={6}
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
