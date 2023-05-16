import { HeaderTemplate } from "../../templates/HeaderTemplate";
import nikeInvencible2 from "../../assets/nike-invincible2.jpg";
import nikeInvencible3 from "../../assets/nike-invencible3.jpg";

export function NikeInvenciblePage() {
  return (
    <HeaderTemplate>
      <div className="h-full text-black w-full flex justify-center p-4">
        <div className="flex flex-col">
          <div className="grid grid-cols-2 grid-flow-row ">
            <img src={nikeInvencible2} alt="" />
            <img src={nikeInvencible3} alt="" />
          </div>

          <div className="flex h-full d w-full">
            <div className=" w-1/2 flex flex-col items-center justify-center">
              <strong className="text-6xl font-extrabold flex items-center justify-center mb-2">
                NIKE INVENCIBLE 3
              </strong>
              <span className="text-lg font font-medium text-zinc-600 flex text-justify">
                The Invincible Run 3 sports a thick cushioning plate to help you
                stay on your feet today, tomorrow and beyond. It's super
                stretchy and flexible, so you can go your way and come back to
                your next run feeling ready and refreshed.
              </span>
            </div>
            <div className="text-2xl font-extrabold w-1/2 flex items-center justify-center">
              <span className="bg-green p-8 rounded-2xl text-zinc-100 w-1/2 flex items-center justify-center cursor-pointer hover:opacity-80 transition-all">
                Buy now
              </span>
            </div>
          </div>
        </div>
      </div>
    </HeaderTemplate>
  );
}
