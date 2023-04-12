import { Keyhole, UserCircle } from "phosphor-react";

export function Register() {
  return (
    <>
      <div className="flex-col flex items-center w-full justify-center dark:bg-zinc-100">
        <strong className="text-3xl mb-32 -mt-20 text-[#134152]">
          Register
        </strong>
        <div className="flex flex-col items-center w-full ">
          <div className="flex items-center justify-center mt-4 w-full opacity-80 mr-[8%]">
            <UserCircle size={38} color="#164d63" className="mr-1" />
            <input
              className="w-1/2 bg-[#fafafa] border-solid border-2 border-[#164d63] p-3 rounded flex items-center text-[#000] placeholder-[#8a8a8a] text-sm dark:placeholder:text-zinc-700 dark:bg-zinc-100"
              placeholder="Email"
              autoFocus
            />
          </div>

          <div className="flex items-center justify-center mt-4 w-full opacity-80 mr-[8%]">
            <Keyhole size={38} color="#164d63" className="mr-1" />
            <input
              className="w-1/2 bg-[#fafafa] border-solid border-2 border-[#164d63] p-3 rounded flex items-center text-[#000] placeholder-[#8a8a8a] text-sm dark:placeholder:text-zinc-700 dark:bg-zinc-100"
              placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-center mt-4 w-full opacity-80 mr-[8%]">
            <Keyhole size={38} color="#164d63" className="mr-1" />
            <input
              className="w-1/2 bg-[#fafafa] border-solid border-2 border-[#164d63] p-3 rounded flex items-center text-[#000] placeholder-[#8a8a8a] text-sm dark:placeholder:text-zinc-700 dark:bg-zinc-100"
              placeholder="Confirm password"
            />
          </div>

          <button
            className="button-animated cursor-pointer bg-[#164d63] mt-8 transition-all font-bold"
            type="button"
          >
            Create account
          </button>
        </div>
      </div>
    </>
  );
}
