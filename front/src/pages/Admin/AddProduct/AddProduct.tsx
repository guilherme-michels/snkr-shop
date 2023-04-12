import { useToast } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { api } from "../../../lib/axios";
import { useNavigate } from "react-router-dom";
import { NormalModal } from "../../../components/Modal/NormalModal";

export function AddProduct() {
  const toast = useToast();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [sizes, setSizes] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  function createNewProduct(event: FormEvent) {
    event.preventDefault();

    if (!name || !type || !price || !sizes) {
      return;
    }

    api.post("user", {
      name,
      type,
      price,
      sizes,
    });

    clearForm();

    toast({
      description: "New product created",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  }

  function clearForm() {
    setType("");
    setName("");
    setPrice(0);
    setSizes("");
  }

  return (
    <div className="h-full flex flex-col items-center ">
      <div className="flex justify-between w-[70%]">
        <form onSubmit={createNewProduct} className="w-full">
          <div className="grid grid-cols-2 grid-flow-row gap-14">
            <div className="mt-3">
              <label>Name *</label>
              <input
                type="text"
                placeholder="First name"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="mt-3">
              <label>Type *</label>
              <input
                type="text"
                placeholder="Last name"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                value={type}
                onChange={(event) => setType(event.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 grid-flow-row gap-14">
            <div className="mt-3">
              <label>Sizes *</label>
              <input
                type="text"
                placeholder="Phone"
                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                value={sizes}
                onChange={(event) => setSizes(event.target.value)}
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
