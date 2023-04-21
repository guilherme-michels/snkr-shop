import { FacebookLogo, InstagramLogo, TwitterLogo } from "phosphor-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
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
          <div className="flex text-white text-sm">Exchange and returns</div>
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
  );
}
