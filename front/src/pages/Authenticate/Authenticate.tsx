import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import tiger1 from "../../assets/tiger1.jpg";

export function Authenticate() {
  const [loginOrRegister, setLoginOrRegister] = useState(true);

  return (
    <div className="flex h-full w-full bg-[#131313]">
      <div className="h-full flex justify-between">
        <img src={tiger1} alt="" />
      </div>

      <div className="flex justify-start absolute  w-full transition-all">
        {loginOrRegister ? <Login /> : <Register />}
      </div>

      <div
        className="absolute top-[10%] left-[48%] text-white font-bold cursor-pointer"
        onClick={() => setLoginOrRegister(!loginOrRegister)}
      >
        Register
      </div>
    </div>
  );
}
