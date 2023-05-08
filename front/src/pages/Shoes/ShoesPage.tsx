import { ShoppingCart } from "phosphor-react";
import { HeaderTemplate } from "../../templates/HeaderTemplate";
import { ShoeCard } from "./ShoeCard";
import { Link } from "react-router-dom";
import courtPurple from "../../assets/court_purple.jpg";

export function ShoesPage() {
  return (
    <HeaderTemplate>
      <div className=" h-full text-black w-full flex justify-center p-8">
        <div className="grid grid-cols-6 grid-flow-row gap-4 mt-4 mb-32">
          <div>
            <div
              className="w-[200px] h-[200px] flex items-end p-4 cursor-pointer bg-[#f8f8f8] shadow-md shadow-zinc-400 hover:shadow-zinc-500 transition-all"
              style={{
                backgroundImage: `url(${courtPurple})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <strong className="bg-zinc-500 hover:opacity-80 transition-all text-white p-1 text-sm rounded flex items-center">
                Buy
                <ShoppingCart color="#fff" size={16} className="ml-2" />
              </strong>
            </div>
            <div className="p-1 flex flex-col">
              <strong className="text-base">Nike Court Purple</strong>
              <span className="text-sm text-zinc-500">Sneakers</span>
              <span>U$ 1400,00</span>
            </div>
          </div>
          <div>
            <div
              className="w-full h-[200px] flex items-end p-4 cursor-pointer bg-[#f8f8f8] shadow-md shadow-zinc-400 hover:shadow-zinc-500 transition-all"
              style={{
                backgroundImage: `url(${courtPurple})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <strong className="bg-zinc-500 hover:opacity-80 transition-all text-white p-1 text-sm rounded flex items-center">
                Buy
                <ShoppingCart color="#fff" size={16} className="ml-2" />
              </strong>
            </div>
            <div className="p-1 flex flex-col">
              <strong className="text-base">Nike Court Purple</strong>
              <span className="text-sm text-zinc-500">Sneakers</span>
              <span>U$ 1400,00</span>
            </div>
          </div>
          <div>
            <div
              className="w-full h-[200px] flex items-end p-4 cursor-pointer bg-[#f8f8f8] shadow-md shadow-zinc-400 hover:shadow-zinc-500 transition-all"
              style={{
                backgroundImage: `url(${courtPurple})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <strong className="bg-zinc-500 hover:opacity-80 transition-all text-white p-1 text-sm rounded flex items-center">
                Buy
                <ShoppingCart color="#fff" size={16} className="ml-2" />
              </strong>
            </div>
            <div className="p-1 flex flex-col">
              <strong className="text-base">Nike Court Purple</strong>
              <span className="text-sm text-zinc-500">Sneakers</span>
              <span>U$ 1400,00</span>
            </div>
          </div>
          <div>
            <div
              className="w-full h-[200px] flex items-end p-4 cursor-pointer bg-[#f8f8f8] shadow-md shadow-zinc-400 hover:shadow-zinc-500 transition-all"
              style={{
                backgroundImage: `url(${courtPurple})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <strong className="bg-zinc-500 hover:opacity-80 transition-all text-white p-1 text-sm rounded flex items-center">
                Buy
                <ShoppingCart color="#fff" size={16} className="ml-2" />
              </strong>
            </div>
            <div className="p-1 flex flex-col">
              <strong className="text-base">Nike Court Purple</strong>
              <span className="text-sm text-zinc-500">Sneakers</span>
              <span>U$ 1400,00</span>
            </div>
          </div>
          <div>
            <div
              className="w-full h-[200px] flex items-end p-4 cursor-pointer bg-[#f8f8f8] shadow-md shadow-zinc-400 hover:shadow-zinc-500 transition-all"
              style={{
                backgroundImage: `url(${courtPurple})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <strong className="bg-zinc-500 hover:opacity-80 transition-all text-white p-1 text-sm rounded flex items-center">
                Buy
                <ShoppingCart color="#fff" size={16} className="ml-2" />
              </strong>
            </div>
            <div className="p-1 flex flex-col">
              <strong className="text-base">Nike Court Purple</strong>
              <span className="text-sm text-zinc-500">Sneakers</span>
              <span>U$ 1400,00</span>
            </div>
          </div>

          <div>
            <div
              className="w-full h-[200px] flex items-end p-4 cursor-pointer bg-[#f8f8f8] shadow-md shadow-zinc-400 hover:shadow-zinc-500 transition-all"
              style={{
                backgroundImage: `url(${courtPurple})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <strong className="bg-zinc-500 hover:opacity-80 transition-all text-white p-1 text-sm rounded flex items-center">
                Buy
                <ShoppingCart color="#fff" size={16} className="ml-2" />
              </strong>
            </div>
            <div className="p-1 flex flex-col">
              <strong className="text-base">Nike Court Purple</strong>
              <span className="text-sm text-zinc-500">Sneakers</span>
              <span>U$ 1400,00</span>
            </div>
          </div>

          <div>
            <div
              className="w-full h-[200px] flex items-end p-4 cursor-pointer bg-[#f8f8f8] shadow-md shadow-zinc-400 hover:shadow-zinc-500 transition-all"
              style={{
                backgroundImage: `url(${courtPurple})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <strong className="bg-zinc-500 hover:opacity-80 transition-all text-white p-1 text-sm rounded flex items-center">
                Buy
                <ShoppingCart color="#fff" size={16} className="ml-2" />
              </strong>
            </div>
            <div className="p-1 flex flex-col">
              <strong className="text-base">Nike Court Purple</strong>
              <span className="text-sm text-zinc-500">Sneakers</span>
              <span>U$ 1400,00</span>
            </div>
          </div>
        </div>
      </div>
    </HeaderTemplate>
  );
}
