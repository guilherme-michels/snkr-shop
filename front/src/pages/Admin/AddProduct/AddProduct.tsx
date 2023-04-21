import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { NormalModal } from "../../../components/Modal/NormalModal";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../../api/product/product.service";

const addProductSchema = z.object({
  name: z.string().min(3),
  type: z.string().min(3),
  quantity: z.number(),
  sizes: z.number(),
});

type AddProductData = z.infer<typeof addProductSchema>;

export function AddProduct() {
  const toast = useToast();

  const { handleSubmit, register, reset } = useForm<AddProductData>({
    defaultValues: {
      name: "",
      type: "",
      quantity: 0,
      sizes: 0,
    },
    shouldUseNativeValidation: true,
    resolver: zodResolver(addProductSchema),
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFormSubmit = async (data: AddProductData) => {
    try {
      await addProduct(data);

      toast({
        description: "New product created",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      reset();
    } catch (error) {
      if (isAxiosError(error)) {
        let errorDescription = "Error while creating product";

        if (error.response?.status === 409) {
          errorDescription = "Product already exists";
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
              <label>Name *</label>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                {...register("name")}
              />
            </div>

            <div className="mt-3">
              <label>Type *</label>
              <input
                type="text"
                placeholder="Type"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                {...register("type")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 grid-flow-row gap-14">
            <div className="mt-3">
              <label>Quantity *</label>
              <input
                type="number"
                placeholder="Quantity"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                {...register("quantity")}
              />
            </div>

            <div className="mt-3">
              <label>Sizes *</label>
              <input
                type="number"
                placeholder="Sizes"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                {...register("sizes")}
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
