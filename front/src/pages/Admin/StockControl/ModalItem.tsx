import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import { NotePencil, Star, Trash } from "phosphor-react";
import { useCallback, useEffect, useState } from "react";
import { SizeCard } from "./SizeCard";
import { Product } from "../../../interfaces/ProductInterface";
import {
  addSizes,
  getImage,
  getProduct,
  getProductSizes,
  removeSizes,
  setBestSeller,
  unSetBestSeller,
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
  const [image, setImage] = useState<string>();
  const toast = useToast();
  const [availableSizes, setAvailableSizes] = useState<number[]>([]);
  const [attProduct, setAttProduct] = useState<Product>(product);

  useEffect(() => {
    const fetchImage = async () => {
      if (product) {
        const imageData = await getImage(product.image);
        const imageUrl = URL.createObjectURL(imageData);
        setImage(imageUrl);
      }
    };

    fetchImage();
  }, [product?.image]);

  const onAddSize = async (productId: string, size: number) => {
    try {
      await addSizes(productId, size);
      fetchProductSizes();
      toast({
        position: "top-right",
        description: `Size ${size} added to stock`,
        status: "success",
        duration: 1000,
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
          duration: 1000,
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
        duration: 1000,
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
          duration: 1000,
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

  const onSetBestSeller = async (productId: string) => {
    try {
      await setBestSeller(productId);
      fetchBestSeller();
      toast({
        position: "top-right",
        description: `${product.name} added to Best Sellers!`,
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onUnsetBestSeller = async (productId: string) => {
    try {
      await unSetBestSeller(productId);
      fetchBestSeller();
      toast({
        position: "top-right",
        description: `${product.name} removed from Best Sellers!`,
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBestSeller = useCallback(() => {
    getProduct(product.id).then((data) => {
      setAttProduct(data);
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
            <strong className="text-2xl">{attProduct.name}</strong>
          </ModalHeader>
          <ModalCloseButton color={"#aeaeae"} />

          <ModalBody className="bg-zinc-200 h-full">
            <div className="flex items-center h-full p-8">
              <div className="h-full w-3/5">
                <div
                  className="h-full flex items-end p-4 bg-[#f8f8f8] shadow-md shadow-zinc-200 transition-all"
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </div>
              <div className="h-full w-2/5 flex flex-col text-zinc-700 items-center">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col items-center ml-10">
                    <strong className="text-base">{attProduct.name}</strong>
                    <strong className="text-3xl mt-1">{attProduct.type}</strong>
                  </div>
                  <div>
                    {attProduct.bestSeller ? (
                      <Star
                        className="bg-yellow p-2 text-white cursor-pointer rounded-full hover:opacity-60 transition-all"
                        size={48}
                        onClick={() => onUnsetBestSeller(attProduct.id)}
                      />
                    ) : (
                      <Star
                        className="bg-black p-2 text-white cursor-pointer rounded-full hover:bg-zinc-900 transition-all"
                        size={48}
                        onClick={() => onSetBestSeller(attProduct.id)}
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-5 grid-flow-row gap-14 mt-10 w-4/5">
                  {sizes.map((size) => (
                    <div key={size.size}>
                      <div
                        onClick={() => onAddSize(attProduct.id, size.size)}
                        className="flex flex-col items-center"
                      >
                        <SizeCard
                          value={size.size}
                          inStock={availableSizes.includes(size.size)}
                        />
                      </div>
                      {availableSizes.includes(size.size) ? (
                        <Trash
                          onClick={() => onDeleteSize(attProduct.id, size.size)}
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
