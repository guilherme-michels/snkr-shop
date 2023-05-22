import { HeaderTemplate } from "../../templates/HeaderTemplate";
import runBoostMp4 from "../../assets/runboost.mp4";
import jordan from "../../assets/jordan.png";
import nikeRunning from "../../assets/nike-running.png";
import streetWear from "../../assets/streetwear.png";

import { Trophy } from "phosphor-react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/ProductInterface";
import { ShoeCard } from "../Shoes/ShoeCard";
import { getBestSeller } from "../../api/product/product.service";

export function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  const images = [
    "https://imgnike-a.akamaihd.net/1920x1920/026282MT.jpg",
    "https://imgnike-a.akamaihd.net/1920x1920/02627851.jpg",
    "https://imgnike-a.akamaihd.net/1920x1920/0262797T.jpg",
    "https://imgnike-a.akamaihd.net/768x768/026275MT.jpg",
    "https://imgnike-a.akamaihd.net/768x768/02625615.jpg",
    "https://imgnike-a.akamaihd.net/768x768/02625551.jpg",
    "https://imgnike-a.akamaihd.net/768x768/02622515.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    fetchBestSellers();
    return () => clearInterval(interval);
  }, []);

  const fetchBestSellers = async () => {
    const bestSellers = await getBestSeller();

    const shuffledBestSellers = bestSellers.sort(() => Math.random() - 0.5);

    const randomBestSellers = shuffledBestSellers.slice(0, 5);

    setBestSellers(randomBestSellers);
  };

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
            <Link to="/shoes">
              <div
                className="w-full h-[500px] rounded flex items-end p-4 cursor-pointer hover:scale-[102%] transition-all"
                style={{
                  backgroundImage: `url(${jordan})`,
                  backgroundSize: "cover",
                }}
              >
                <strong className="bg-white p-2 rounded-2xl text-sm text-zinc-900">
                  Snkrs
                </strong>
              </div>
            </Link>
            <div
              className="w-full h-[500px] rounded flex items-end p-4 cursor-pointer hover:scale-[102%] transition-all"
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
              className="w-full h-[500px] rounded flex items-end p-4 cursor-pointer hover:scale-[102%] transition-all"
              style={{
                backgroundImage: `url(${nikeRunning})`,
                backgroundSize: "cover",
              }}
            >
              <strong className="bg-white p-2 rounded-2xl text-sm text-zinc-900  ">
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

        <div className="flex items-center w-full justify-center bg-gradient-to-r from-[#e2e2e2] via-[#fff] to-[#e2e2e2] mb-20">
          <div
            style={{
              width: "35%",
              height: "400px",
              position: "relative",
            }}
          >
            <motion.img
              src={images[activeIndex]}
              alt="Carousel Image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "10px",
              }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: activeIndex === index ? "white" : "gray",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {bestSellers.length > 0 ? (
          <>
            <div className="flex items-center w-full justify-center flex-col">
              <strong className="text-zinc-500 text-base flex items-center">
                BEST SELLERS
                <Trophy className="#828282 ml-2" size={22} />
              </strong>
            </div>

            <div className="flex items-center w-full justify-center">
              <div className="flex mt-4 w-[65%] mb-10 ">
                <div className="flex">
                  {bestSellers.map((bestSeller) => (
                    <div key={bestSeller.id} className="ml-4">
                      <ShoeCard product={bestSeller} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : null}

        <Footer />
      </div>
    </HeaderTemplate>
  );
}
