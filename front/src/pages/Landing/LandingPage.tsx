import { HeaderTemplate } from "../../templates/HeaderTemplate";
import runBoostMp4 from "../../assets/runboost.mp4";
import jordan from "../../assets/jordan.png";
import nikeRunning from "../../assets/nike-running.png";
import streetWear from "../../assets/streetwear.png";
import courtPurple from "../../assets/court_purple.jpg";

import {
  FacebookLogo,
  InstagramLogo,
  Plus,
  ShoppingCart,
  Trophy,
  TwitterLogo,
} from "phosphor-react";
import { Link } from "react-router-dom";

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
          <button className="text-white bg-zinc-900 p-2 mt-4 w-[120px] rounded-3xl text-base">
            See release
          </button>
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
        <div className="w-full h-64 bg-black flex justify-center">
          <div className="w-[65%] justify-between flex p-4">
            <div className="flex flex-col">
              <strong className="mb-1 text-white">Found us</strong>
              <hr />
              <div className="flex text-white text-sm mt-1">Find SNKR SHOP</div>
              <div className="flex text-white text-sm">Gift card</div>
            </div>

            <div className="flex flex-col">
              <strong className="mb-1 text-white">About us</strong>
              <hr />
              <div className="flex text-white text-sm mt-1">Help</div>
              <div className="flex text-white text-sm">Contact us</div>
              <div className="flex text-white text-sm">Payments</div>
              <div className="flex text-white text-sm">
                Exchange and returns
              </div>
            </div>

            <div className="flex flex-col items-center">
              <strong className="mb-2 text-white">Follow us</strong>
              <div className="flex">
                <Link
                  to="https://www.facebook.com"
                  className="bg-white p-1 rounded-full cursor-pointer transition-all hover:bg-zinc-300"
                >
                  <FacebookLogo size={20} color="#272727" />
                </Link>
                <Link
                  to="https://www.instagram.com"
                  className="bg-white p-1 rounded-full cursor-pointer transition-all hover:bg-zinc-300 ml-2"
                >
                  <InstagramLogo size={20} color="#272727" />
                </Link>
                <Link
                  to="https://www.twitter.com"
                  className="bg-white p-1 rounded-full cursor-pointer transition-all hover:bg-zinc-300 ml-2"
                >
                  <TwitterLogo size={20} color="#272727" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderTemplate>
  );
}
