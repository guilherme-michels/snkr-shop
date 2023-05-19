import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import { NotePencil, Trash } from "phosphor-react";
import { useCallback, useEffect, useState } from "react";
import { SizeCard } from "./SizeCard";
import { Product } from "../../../interfaces/ProductInterface";
import {
  addSizes,
  getProductSizes,
  removeSizes,
} from "../../../api/product/product.service";
import { isAxiosError } from "axios";

interface ModalProps {
  onCloseModal: () => void;
  product: Product;
}

const sizes = [
  {
    size: 34,
  },
  {
    size: 35,
  },
  {
    size: 36,
  },
  {
    size: 37,
  },
  {
    size: 38,
  },
  {
    size: 39,
  },
  {
    size: 40,
  },
  {
    size: 41,
  },
  {
    size: 42,
  },
  {
    size: 43,
  },
  {
    size: 44,
  },
  {
    size: 45,
  },
  {
    size: 46,
  },
  {
    size: 47,
  },

  {
    size: 48,
  },
];

export const ModalItem = ({ onCloseModal, product }: ModalProps) => {
  const toast = useToast();
  const [availableSizes, setAvailableSizes] = useState<number[]>([]);

  const onAddSize = async (productId: string, size: number) => {
    try {
      await addSizes(productId, size);
      fetchProductSizes();
      toast({
        position: "top-right",
        description: `Size ${size} added to stock`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        let errorDescription = "Error while adding size to this product";

        if (error.response?.status === 409) {
          errorDescription = "Shoe size already exists for the product";
        }

        if (error.response?.status === 404) {
          errorDescription = "Product not found";
        }

        toast({
          position: "top-right",
          description: errorDescription,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  const onDeleteSize = async (productId: string, size: number) => {
    try {
      await removeSizes(productId, size);
      fetchProductSizes();
      toast({
        position: "top-right",
        description: `Size ${size} removed from stock`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        let errorDescription = "Error while removing size to this product";

        if (error.response?.status === 404) {
          errorDescription = "Product not found";
        }

        toast({
          position: "top-right",
          description: errorDescription,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  const fetchProductSizes = useCallback(() => {
    getProductSizes(product.id).then((data) => {
      setAvailableSizes(
        data.sizes
          .filter((size: any) => size.quantity > 0)
          .map((size: any) => size.size)
      );
    });
  }, [product]);

  useEffect(() => {
    fetchProductSizes();
  }, [fetchProductSizes]);

  return (
    <Modal
      closeOnOverlayClick={true}
      isOpen={true}
      onClose={onCloseModal}
      size={"5xl"}
      onOverlayClick={onCloseModal}
    >
      <ModalOverlay />
      <form>
        <ModalContent className="h-2/3">
          <ModalHeader className="bg-zinc-300 text-zinc-700">
            <strong className="text-2xl">{product.name}</strong>
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
                    <strong className="text-base">{product.name}</strong>
                    <strong className="text-3xl mt-1">{product.type}</strong>
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
                    <div key={size.size}>
                      <div
                        onClick={() => onAddSize(product.id, size.size)}
                        className="flex flex-col items-center"
                      >
                        <SizeCard
                          value={size.size}
                          inStock={availableSizes.includes(size.size)}
                        />
                      </div>
                      {availableSizes.includes(size.size) ? (
                        <Trash
                          onClick={() => onDeleteSize(product.id, size.size)}
                          className="mt-2 cursor-pointer hover:opacity-75"
                          size={16}
                        />
                      ) : null}
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
