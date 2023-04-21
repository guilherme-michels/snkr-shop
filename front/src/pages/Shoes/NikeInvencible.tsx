import { HeaderTemplate } from "../../templates/HeaderTemplate";

import runGif from "../../assets/run.gif";
import nikeInvencible1 from "../../assets/nike-invencible1.jpg";
import nikeInvencible2 from "../../assets/nike-invincible2.jpg";
import nikeInvencible3 from "../../assets/nike-invencible3.jpg";
import nikeInvencible4 from "../../assets/nike-invencible4.png";
import { Footer } from "../../components/Footer/Footer";

export function NikeInvenciblePage() {
  return (
    <HeaderTemplate>
      <div className="h-full text-black w-full flex justify-center p-10">
        <div className="flex flex-col">
          <div className="grid grid-cols-2 grid-flow-row ">
            <img src={nikeInvencible2} alt="" />
            <img src={nikeInvencible3} alt="" />
          </div>

          <div className="flex h-full d w-full">
            <div className="text-6xl font-extrabold w-1/2">
              NIKE INVENCIBLE 3
            </div>
            <div className="text-8xl font-extrabold w-1/2">
              <img src={nikeInvencible1} alt="" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </HeaderTemplate>
  );
}
