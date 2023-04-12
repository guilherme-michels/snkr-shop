import { HeaderTemplate } from "../../templates/HeaderTemplate";
import dunklowcourtpurple1 from "../../assets/dunklowcourtpurple1.jpg";
import dunklowcourtpurple2 from "../../assets/dunklowcourtpurple2.jpg";
import dunklowcourtpurple3 from "../../assets/dunklowcourtpurple3.jpg";

export function ShoePage() {
  return (
    <HeaderTemplate>
      <div className="h-full text-black w-full flex justify-center">
        <div className="flex flex-col items-center w-full h-full">
          <div className="flex items-center h-full w-full flex-col mt-8">
            <div className="text-xl flex flex-col items-center">
              <strong>Nike SB Dunk Low</strong>
              <span>Court Purple</span>
            </div>
            <div className="mt-8 flex justify-between w-4/5">
              <img
                src={dunklowcourtpurple1}
                className="shadow-md shadow-zinc-500 rounded h-[440px]"
              />
              <img
                src={dunklowcourtpurple2}
                className="shadow-md shadow-zinc-500 rounded h-[440px]"
              />
              <img
                src={dunklowcourtpurple3}
                className="shadow-md shadow-zinc-500 rounded h-[440px]"
              />
            </div>
            <div className="text-xl flex justify-between items-center w-4/5 mt-8">
              <div></div>
              <div className="flex flex-col items-center">
                <strong className="text-3xl">U$ 1450,00</strong>
                <span className="text-zinc-600 text-lg">
                  Or 9 times of
                  <span className="text-lime-500 font-bold "> U$ 161</span> on
                  the interest-free card
                </span>

                <input
                  type="text"
                  placeholder="Select size"
                  className=" border-solid border-[1px]  transition-all m-1 text-zinc-500 border-zinc-500 outline-none text-sm p-2 rounded mt-4 w-full"
                />

                <button className="mt-2 w-full bg-lime-500 text-white rounded p-4 opacity-90 hover:opacity-100 transition-all">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderTemplate>
  );
}
