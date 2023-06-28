import { useForm } from "react-hook-form";
import { Select, useToast } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { editPerson, getPerson } from "../../../api/person/person.service";
import { HeaderTemplate } from "../../../templates/HeaderTemplate";
import { useEffect, useState } from "react";

const editAdminSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email().nonempty(),
  password: z.string().min(5),
  position: z.string().min(3),
  phone: z.string().min(11).max(11),
  cpf: z.string().min(11).max(11),
  dateBirth: z.string().nonempty(),
});

export function AdminEdit() {
  const { handleSubmit, register, setValue } = useForm({
    shouldUseNativeValidation: true,
    resolver: zodResolver(editAdminSchema),
  });

  const navigate = useNavigate();
  const toast = useToast();
  const params = useParams();
  const [firsName, setFirstName] = useState<any>();
  const [lastName, setLastName] = useState<any>();
  const [phone, setPhone] = useState<any>();
  const [email, setEmail] = useState<any>();
  const [dateBirth, setDateBirth] = useState<any>();
  const [cpf, setCpf] = useState<any>();
  const [position, setPosition] = useState<any>();
  const [password, setPassword] = useState<any>();

  async function onEdit(values: any) {
    try {
      await editPerson({
        ...values,
        id: params.id,
      });

      localStorage.setItem("position", values.position);

      toast({
        description: "User successfully edited.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigate("/admin");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast({
          description: "User edit error",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  }

  useEffect(() => {
    getPerson(params.id as any).then((res) => {
      setValue("firstName", res.firstName);
      setFirstName(res.firstName);

      setValue("lastName", res.lastName);
      setLastName(res.lastName);

      setValue("phone", res.phone);
      setPhone(res.phone);

      setValue("email", res.email);
      setEmail(res.email);

      setValue("dateBirth", res.dateBirth);
      setDateBirth(res.dateBirth);

      setValue("cpf", res.cpf);
      setCpf(res.cpf);

      setValue("position", res.position);
      setPosition(res.position);

      setValue("password", res.password);
      setPassword(res.password);
    });
  }, [params, setValue]);

  return (
    <HeaderTemplate>
      <div className="h-full flex flex-col items-center ">
        <div className="flex justify-between w-[70%]">
          <form onSubmit={handleSubmit(onEdit)} className="w-full">
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
                <Link to="/admin">
                  <button
                    type="button"
                    className="bg-red mt-4 rounded-lg p-4 flex items-center font-semibold justify-center hover:opacity-90 transition-all text-white"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  className="bg-black ml-4 mt-4 rounded-lg p-4 flex items-center font-semibold justify-center hover:opacity-90 transition-all text-white"
                >
                  Edit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </HeaderTemplate>
  );
}
