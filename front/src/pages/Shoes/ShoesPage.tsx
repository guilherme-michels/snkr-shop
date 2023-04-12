import { HeaderTemplate } from "../../templates/HeaderTemplate";
import { ShoeCard } from "./ShoeCard";
import { Link } from "react-router-dom";

export function ShoesPage() {
  return (
    <HeaderTemplate>
      <div className=" h-full p-10 text-black w-full flex justify-center">
        <div className="flex flex-col items-center"></div>
      </div>
    </HeaderTemplate>
  );
}
