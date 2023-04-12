import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { Check, NotePencil } from "phosphor-react";
import { useState } from "react";
import { SizeCard } from "./SizeCard";

interface ModalProps {
  onCloseModal: () => void;
}

const sizes = [
  {
    size: 34,
    quantity: 3,
  },
  {
    size: 35,
    quantity: 23,
  },
  {
    size: 36,
    quantity: 3,
  },
  {
    size: 37,
    quantity: 0,
  },
  {
    size: 38,
    quantity: 3,
  },
  {
    size: 39,
    quantity: 73,
  },
  {
    size: 40,
    quantity: 3,
  },
  {
    size: 41,
    quantity: 0,
  },
  {
    size: 42,
    quantity: 5,
  },
  {
    size: 43,
    quantity: 4,
  },
  {
    size: 44,
    quantity: 12,
  },
  {
    size: 45,
    quantity: 3,
  },
  {
    size: 46,
    quantity: 2,
  },
  {
    size: 47,
    quantity: 1,
  },

  {
    size: 48,
    quantity: 0,
  },
];

export const ModalItem = ({ onCloseModal }: ModalProps) => {
  const [sizeQuantity, setSizeQuantity] = useState(0);
  const [size, setSize] = useState(0);
  const [viewSizeQuantity, setViewSizeQuantity] = useState(false);

  function quantity(quant: number, size: number) {
    setSizeQuantity(quant);
    setSize(size);

    setViewSizeQuantity(true);
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={true}
      onClose={onCloseModal}
      size={"5xl"}
      onOverlayClick={onCloseModal}
    >
      <ModalOverlay />
      <form>
        <ModalContent className="h-2/3">
          <ModalHeader className="bg-zinc-300 text-zinc-700">
            <strong className="text-2xl">Jordan 1</strong>
          </ModalHeader>
          <ModalCloseButton color={"#aeaeae"} />

          <ModalBody className="bg-zinc-200 h-full">
            <div className="flex items-center h-full p-8">
              <div className="h-full w-3/5">
                <div className="bg-white h-full w-full rounded-xl"></div>
              </div>
              <div className="h-full w-2/5 flex flex-col text-zinc-700 items-center">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col items-center ml-10">
                    <strong className="text-base">Air Jordan 1 Low</strong>
                    <strong className="text-3xl mt-1">Cardinal Red</strong>
                  </div>
                  <div>
                    <NotePencil
                      className="bg-zinc-700 p-2 text-white cursor-pointer rounded-full hover:bg-zinc-900 transition-all"
                      size={48}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-5 grid-flow-row gap-14 mt-10 w-4/5">
                  {sizes.map((size) => (
                    <div
                      key={size.size}
                      onClick={() => quantity(size.quantity, size.size)}
                    >
                      <SizeCard
                        inStock={size.quantity != 0}
                        value={size.size}
                      />
                    </div>
                  ))}
                </div>

                {viewSizeQuantity ? (
                  <div className="mt-14 flex items-center">
                    <span className="font-bold">({size}) SIZE QUANTITY: </span>
                    <input
                      type="text"
                      className="bg-transparent border-[1px] border-white p-1 placeholder:text-zinc-700 ml-2 w-20 mr-2 rounded cursor-pointer"
                      value={sizeQuantity}
                    />
                    <Check
                      size={30}
                      className="text-green hover:animate-pulse cursor-pointer"
                      onClick={() => setViewSizeQuantity(false)}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </form>
    </Modal>
  );
};
