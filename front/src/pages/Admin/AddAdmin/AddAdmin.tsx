import { Select, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { NormalModal } from "../../../components/Modal/NormalModal";
import { addPerson } from "../../../api/person/person.service";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const addAdminSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email().nonempty(),
  password: z.string().min(5),
  position: z.string().min(3),
  phone: z.string().min(11).max(11),
  cpf: z.string().min(11).max(11),
  dateBirth: z.string().nonempty(),
});

type AddAdminData = z.infer<typeof addAdminSchema>;

export function AddAdmin() {
  const toast = useToast();

  const { handleSubmit, register, reset } = useForm<AddAdminData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      cpf: "",
      dateBirth: "",
      email: "",
      password: "",
      phone: "",
      position: "",
    },
    shouldUseNativeValidation: true,
    resolver: zodResolver(addAdminSchema),
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const onFormSubmit = async (data: AddAdminData) => {
    try {
      await addPerson(data);

      toast({
        description: "New user created",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      reset();
    } catch (error) {
      if (isAxiosError(error)) {
        let errorDescription = "Error while creating user";

        if (error.response?.status === 409) {
          errorDescription = "E-mail already exists";
        }

        toast({
          description: errorDescription,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <div className="h-full flex flex-col items-center ">
      <div className="flex justify-between w-[70%]">
        <form onSubmit={handleSubmit(onFormSubmit)} className="w-full">
          <div className="grid grid-cols-2 grid-flow-row gap-14">
            <div className="mt-3">
              <label>First name *</label>
              <input
                type="text"
                placeholder="First name"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                {...register("firstName")}
              />
            </div>

            <div className="mt-3">
              <label>Last name *</label>
              <input
                type="text"
                placeholder="Last name"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                {...register("lastName")}
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
                {...register("phone")}
              />
            </div>

            <div className="mt-3">
              <label>Email *</label>
              <input
                type="text"
                placeholder="Email"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                {...register("email")}
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
                {...register("dateBirth")}
              />
            </div>

            <div className="mt-3">
              <label>CPF *</label>
              <input
                type="text"
                placeholder="CPF"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                {...register("cpf")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 grid-flow-row gap-14">
            <div className="mt-3">
              <label>Position *</label>
              <Select
                placeholder="Select position"
                className="w-full mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-900"
                {...register("position")}
                height={12}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </Select>
            </div>

            <div className="mt-3">
              <label>Password *</label>
              <input
                type="text"
                placeholder="Password"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                {...register("password")}
              />
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="text-xs text-zinc-500">* Required field</div>
            <div className="flex">
              <button
                onClick={() => setIsModalVisible(true)}
                type="button"
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
            reset();
          }}
        />
      ) : null}
    </div>
  );
}
