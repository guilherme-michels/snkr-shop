import { HeaderTemplate } from "../../templates/HeaderTemplate";
import runBoostMp4 from "../../assets/runboost.mp4";
import jordan from "../../assets/jordan.png";
import nikeRunning from "../../assets/nike-running.png";
import streetWear from "../../assets/streetwear.png";
import courtPurple from "../../assets/court_purple.jpg";

import { ShoppingCart, Trophy } from "phosphor-react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";

export function LandingPage() {
  return (
    <HeaderTemplate>
      <div className="h-full">
        <div className="font-extrabold text-2xl text-zinc-50 bg-gradient-to-r from-[#fff] via-[#7b7b7b] h-16 to-[#fff] w-full flex items-center justify-center">
          WELCOME TO THE BEST SNKRS SHOP
        </div>
        <div className="flex items-center w-full justify-center">
          <video
            className="videoTag h-[700px] rounded mt-4 mb-10 shadow-md shadow-zinc-700"
            autoPlay
            loop
            muted
          >
            <source src={runBoostMp4} type="video/mp4" />
          </video>
        </div>
        <div className="flex items-center w-full justify-center flex-col">
          <strong className="text-zinc-500 text-base">
            New Nike Invencible 3
          </strong>
          <strong className="text-zinc-500 text-4xl">
            Feel the <span className="text-zinc-800">SPEED</span>
          </strong>
          <Link to="/shoes/nike-invencible">
            <button className="text-white bg-zinc-900 p-2 mt-4 w-[120px] rounded-3xl text-base">
              See release
            </button>
          </Link>
        </div>

        <div className="flex items-center w-full justify-center">
          <div className="grid grid-cols-3 grid-flow-row gap-2 mt-16 w-[65%]">
            <div
              className="w-full h-[500px] rounded flex items-end p-4 cursor-pointer"
              style={{
                backgroundImage: `url(${jordan})`,
                backgroundSize: "cover",
              }}
            >
              <strong className="bg-white p-2 rounded-2xl text-sm text-zinc-900">
                Snkrs
              </strong>
            </div>
            <div
              className="w-full h-[500px] rounded flex items-end p-4 cursor-pointer"
              style={{
                backgroundImage: `url(${streetWear})`,
                backgroundSize: "cover",
              }}
            >
              <strong className="bg-white p-2 rounded-2xl text-sm text-zinc-900">
                Street wear
              </strong>
            </div>
            <div
              className="w-full h-[500px] rounded flex items-end p-4 cursor-pointer"
              style={{
                backgroundImage: `url(${nikeRunning})`,
                backgroundSize: "cover",
              }}
            >
              <strong className="bg-white p-2 rounded-2xl text-sm text-zinc-900">
                Running
              </strong>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full justify-center">
          <div className="w-[65%] h-56 bg-black mt-2 rounded  text-white p-5 mb-24">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-5xl font-bold">The </span>
                <strong className="text-6xl font-extrabold mt-2">BESTS </strong>
                <span className="text-5xl font-bold">
                  prices you find
                  <strong className="text-6xl font-extrabold"> HERE! </strong>
                </span>
              </div>
              <div className="font-extrabold text-6xl">SNKR SHOP</div>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full justify-center flex-col">
          <strong className="text-zinc-500 text-base flex items-center">
            BEST SELLERS
            <Trophy className="#828282 ml-2" size={22} />
          </strong>
        </div>
        <div className="flex items-center w-full justify-center">
          <div className="grid grid-cols-5 grid-flow-row gap-4 mt-4 w-[65%] mb-32">
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
        <Footer />
      </div>
    </HeaderTemplate>
  );
}
