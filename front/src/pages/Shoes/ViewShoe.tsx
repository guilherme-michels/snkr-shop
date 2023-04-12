import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { Check } from "phosphor-react";
import { useState } from "react";
import { ShoeSizeCard } from "./ShoeSizeCard";

interface ViewShoeProps {
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

export const ViewShoe = ({ onCloseModal }: ViewShoeProps) => {
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
          <ModalHeader className="bg-zinc-100 text-zinc-700">
            <strong className="text-2xl">Jordan 1</strong>
          </ModalHeader>
          <ModalCloseButton color={"#aeaeae"} />

          <ModalBody className="bg-bglight h-full">
            <div className="flex items-center h-full p-8">
              <div className="h-full w-3/5 p-10">
                <div className="bg-white h-full w-full rounded-xl"></div>
              </div>
              <div className="h-full w-2/5 flex flex-col text-zinc-700 items-center mt-20">
                <div className="flex flex-col items-center">
                  <strong className="text-base">Air Jordan 1 Low</strong>
                  <strong className="text-3xl mt-1">Cardinal Red</strong>
                </div>

                <div className="grid grid-cols-5 grid-flow-row gap-14 mt-10 w-4/5">
                  {sizes.map((size) => (
                    <div>
                      <ShoeSizeCard
                        inStock={size.quantity != 0}
                        value={size.size}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </form>
    </Modal>
  );
};
