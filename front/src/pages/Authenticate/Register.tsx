import { Link } from "react-router-dom";
import {
  InstagramLogo,
  Keyhole,
  Phone,
  TwitterLogo,
  UserCircle,
} from "phosphor-react";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createAccount } from "../../api/person/person.service";

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function Register() {
  const toast = useToast();
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, auth } = useAuth();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: RegisterData = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const res = await createAccount(data);
      login(res.token!, res.id!, res.position!);

      if (res.id != null) {
        toast({
          description: `Welcome ${res.name}`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          description: `Registration failed`,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex-col flex items-center w-full justify-center h-full mt-48">
        <strong className="text-4xl font-extrabold text-zinc-100">
          Register
        </strong>
        <div className="flex flex-col items-center w-full">
          <form
            onSubmit={onFormSubmit}
            className="flex flex-col items-center w-full"
          >
            <div className="flex items-center justify-center mt-4 w-full">
              <UserCircle size={38} color="#ffffff" className="mr-1" />
              <input
                className="text-white  border-solid border-[1px] border-[#ffffff] p-3 rounded flex items-center bg-transparent placeholder:text-white placeholder:font-bold w-1/4 mr-10"
                placeholder="First name"
                autoFocus
                value={firstName}
                onChange={(event) => setFirstname(event.target.value)}
              />
            </div>

            <div className="flex items-center justify-center mt-4 w-full">
              <UserCircle size={38} color="#ffffff" className="mr-1" />
              <input
                className="text-white  border-solid border-[1px] border-[#ffffff] p-3 rounded flex items-center bg-transparent placeholder:text-white placeholder:font-bold w-1/4 mr-10"
                placeholder="Last name"
                autoFocus
                value={lastName}
                onChange={(event) => setLastname(event.target.value)}
              />
            </div>

            <div className="flex items-center justify-center mt-4 w-full">
              <UserCircle size={38} color="#ffffff" className="mr-1" />
              <input
                className="text-white  border-solid border-[1px] border-[#ffffff] p-3 rounded flex items-center bg-transparent placeholder:text-white placeholder:font-bold w-1/4 mr-10"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="flex items-center justify-center mt-4 w-full">
              <Keyhole size={38} color="#ffffff" className="mr-1" />
              <input
                type="password"
                className="text-white  border-solid border-[1px] border-[#ffffff] p-3 rounded flex items-center bg-transparent placeholder:text-white placeholder:font-bold w-1/4 mr-10"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <button
              className="text-black bg-white w-[100px]  p-4 rounded cursor-pointer mt-8 transition-all font-bold "
              type="submit"
            >
              Register
            </button>
          </form>

          <span className="mt-8 p-2 rounded flex items-center justify-center text-zinc-50 cursor-pointer hover:text-zinc-400 transition-all text-sm">
            Already have an account?{" "}
          </span>

          <div className="mt-24 flex w-1/5 justify-between">
            <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-all cursor-pointer text-white">
              <Phone size={27} color="#000" />
            </span>
            <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-all cursor-pointer text-white">
              <TwitterLogo size={27} color="#000" />
            </span>
            <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-all cursor-pointer text-white">
              <InstagramLogo size={27} color="#000" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
