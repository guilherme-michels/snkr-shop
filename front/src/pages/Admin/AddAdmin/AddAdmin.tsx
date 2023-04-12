import { useToast } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { api } from "../../../lib/axios";
import { NormalModal } from "../../../components/Modal/NormalModal";
import { Password } from "phosphor-react";
import { addPerson } from "../../../api/person/person.service";
import { Person } from "../../../interfaces/PersonInterface";

interface AddAdminData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  position: string;
  phone: string;
  cpf: string;
  dateBirth: string;
}

export function AddAdmin() {
  const toast = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: AddAdminData = {
      firstName,
      lastName,
      email,
      password,
      position,
      phone,
      cpf,
      dateBirth,
    };

    try {
      const res = await addPerson(data);

      if (res.person != null) {
        toast({
          description: "New user created",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          description: "Error",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (err: any) {
      console.log(err);

      const errorResponse = err.response;
    }
  };

  function clearForm() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPosition("");
    setPhone("");
    setCpf("");
    setDateBirth("");
    setPassword("");
  }

  return (
    <div className="h-full flex flex-col items-center ">
      <div className="flex justify-between w-[70%]">
        <form onSubmit={onFormSubmit} className="w-full">
          <div className="grid grid-cols-2 grid-flow-row gap-14">
            <div className="mt-3">
              <label>First name *</label>
              <input
                type="text"
                placeholder="First name"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>

            <div className="mt-3">
              <label>Last name *</label>
              <input
                type="text"
                placeholder="Last name"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 grid-flow-row gap-14">
            <div className="mt-3">
              <label>Phone *</label>
              <input
                type="text"
                placeholder="Phone"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>

            <div className="mt-3">
              <label>Email *</label>
              <input
                type="text"
                placeholder="Email"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 grid-flow-row gap-14">
            <div className="mt-3">
              <label>Birth date *</label>
              <input
                type="date"
                placeholder="Birth date"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                value={dateBirth}
                onChange={(event) => setDateBirth(event.target.value)}
              />
            </div>

            <div className="mt-3">
              <label>CPF *</label>
              <input
                type="text"
                placeholder="CPF"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                value={cpf}
                onChange={(event) => setCpf(event.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 grid-flow-row gap-14">
            <div className="mt-3">
              <label>Position *</label>
              <input
                type="text"
                placeholder="Position"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                value={position}
                onChange={(event) => setPosition(event.target.value)}
              />
            </div>

            <div className="mt-3">
              <label>Password *</label>
              <input
                type="text"
                placeholder="Password"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="text-xs text-zinc-500">* Required field</div>
            <div className="flex">
              <button
                onClick={() => setIsModalVisible(true)}
                className="bg-red mt-4 rounded-lg p-4 flex items-center font-semibold justify-center hover:opacity-90 transition-all text-white"
              >
                Clear
              </button>
              <button
                type="submit"
                className="bg-black ml-4 mt-4 rounded-lg p-4 flex items-center font-semibold justify-center hover:opacity-90 transition-all text-white"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>

      {isModalVisible ? (
        <NormalModal
          text="Are you sure you want to clear the fields?"
          onCloseModal={() => {
            setIsModalVisible(false);
          }}
          confirmClear={() => {
            setIsModalVisible(false);
            clearForm();
          }}
        />
      ) : null}
    </div>
  );
}
