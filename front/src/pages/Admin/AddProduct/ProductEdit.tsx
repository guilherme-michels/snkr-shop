import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { editPerson, getPerson } from "../../../api/person/person.service";
import { HeaderTemplate } from "../../../templates/HeaderTemplate";
import { useEffect, useState } from "react";
import { getProduct } from "../../../api/product/product.service";

const editProductSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email().nonempty(),
  password: z.string().min(5),
  position: z.string().min(3),
  phone: z.string().min(11).max(11),
  cpf: z.string().min(11).max(11),
  dateBirth: z.string().nonempty(),
});

export function ProductEdit() {
  const { handleSubmit, register, setValue } = useForm({
    shouldUseNativeValidation: true,
    resolver: zodResolver(editProductSchema),
  });

  const navigate = useNavigate();
  const toast = useToast();
  const params = useParams();
  const [name, setName] = useState<any>();
  const [code, setCode] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [description, setDescription] = useState<any>();
  const [type, setType] = useState<any>();
  const [image, setImage] = useState<any>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  async function onEdit(values: any) {
    try {
      await editPerson({
        ...values,
        id: params.id,
      });

      toast({
        description: "Product successfully edited.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigate("/admin");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast({
          description: "Product edit error",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  }

  useEffect(() => {
    getProduct(params.id as any).then((res) => {
      setValue("name", res.name);
      setName(res.name);

      setValue("code", res.code);
      setCode(res.code);

      setValue("price", res.price);
      setPrice(res.price);

      setValue("description", res.description);
      setDescription(res.description);

      setValue("type", res.type);
      setType(res.type);

      setValue("image", res.image);
      setImage(res.image);
    });
  }, [params, setValue]);

  return (
    <HeaderTemplate>
      <div className="h-full flex flex-col items-center ">
        <div className="flex justify-between w-[70%]">
          <form onSubmit={handleSubmit(onEdit)} className="w-full">
            <div className="grid grid-cols-2 grid-flow-row gap-14">
              <div className="mt-3">
                <label>Name *</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                  {...register("name")}
                />
              </div>

              <div className="mt-3">
                <label>Code *</label>
                <input
                  type="text"
                  placeholder="Code"
                  className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                  {...register("code")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 grid-flow-row gap-14">
              <div className="mt-3">
                <label>Price *</label>
                <input
                  type="number"
                  placeholder="Price"
                  className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                  {...register("price", { valueAsNumber: true })}
                />
              </div>

              <div className="mt-3">
                <label>Description *</label>
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                  {...register("description")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 grid-flow-row gap-14">
              <div className="mt-3">
                <label>Type *</label>
                <input
                  type="text"
                  placeholder="Type"
                  className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                  {...register("type")}
                />
              </div>

              <div className="mt-3 flex flex-col">
                <label>Image *</label>

                <input type="file" onChange={handleFileChange} />
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
