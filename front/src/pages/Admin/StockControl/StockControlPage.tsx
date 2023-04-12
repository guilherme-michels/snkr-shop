import { StockInfoCard } from "./StockInfoCard";
import { StockTable } from "./StockTable";

export function StockControlPage() {
  return (
    <div className="h-full flex flex-col items-center">
      <div className="w-[70%]">
        <div className="mb-4">
          <div className="text-zinc-700 text-sm font-semibold rounded flex justify-between">
            <StockInfoCard
              title="Items in stock"
              value={30000}
              color="#1a1a1a"
            />
            <StockInfoCard
              title="Items in stock"
              value={3000}
              color="#1a1a1a"
            />
            <StockInfoCard
              title="Items in stock"
              value={3000}
              color="#1a1a1a"
            />
          </div>
        </div>

        <StockTable />
      </div>
    </div>
  );
}
