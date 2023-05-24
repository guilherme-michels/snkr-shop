import { useCallback, useEffect, useState } from "react";
import {
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerFooter,
  useToast,
} from "@chakra-ui/react";
import {
  deleteProductPersonCart,
  getPersonCart,
} from "../../api/person/person.service";
import { CartItem } from "../../interfaces/CartItem";
import { CartItemCard } from "./CartItemCard";
import { Trash, X } from "phosphor-react";
import { Link } from "react-router-dom";
import { Product } from "../../interfaces/ProductInterface";
import { addSales } from "../../api/product/product.service";

interface UserCartProps {
  onCloseCart: () => void;
}

export function UserCart({ onCloseCart }: UserCartProps) {
  const [products, setProducts] = useState<CartItem[]>([]);
  const toast = useToast();

  const fetchUserCart = async () => {
    const newProducts = await getPersonCart();
    setProducts(newProducts);
  };

  useEffect(() => {
    fetchUserCart();
  }, []);

  const fetchProducts = useCallback(() => {
    getPersonCart().then((data) => {
      setProducts(data);
    });
  }, [products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const onEndPurchase = async (products: CartItem[]) => {
    try {
      await addSales(products);
      toast({
        position: "top-right",
        description: "Compra finalizada, obrigado por comprar conosco!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchProducts();
    } catch (err) {
      toast({
        position: "top-right",
        description: "Error",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const onDeleteProductPersonCart = async (productId: string, size: number) => {
    try {
      await deleteProductPersonCart(productId, size);
      toast({
        position: "top-right",
        description: "Product removed from cart!",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      fetchProducts();
    } catch (err) {
      toast({
        position: "top-right",
        description: "Error",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader
          borderBottomWidth="1px"
          fontSize={16}
          fontWeight={"normal"}
          className="flex items-center justify-between bg-zinc-100 text-zinc-900"
        >
          My cart
          <X
            size={22}
            onClick={onCloseCart}
            className="cursor-pointer hover:animate-pulse"
          />
        </DrawerHeader>
        <DrawerBody className="bg-zinc-200">
          {products.length > 0 ? (
            <div>
              {products.map((product) => (
                <div key={product.id}>
                  <Trash
                    onClick={() =>
                      onDeleteProductPersonCart(
                        product.product.id,
                        product.size
                      )
                    }
                    className="cursor-pointer mt-5 bg-white text-zinc-600 rouned-t-xl w-6 h-6 p-1"
                    size={20}
                  />
                  <CartItemCard product={product.product} size={product.size} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center text-xl">
              Your cart is empty!
            </div>
          )}
        </DrawerBody>
        <DrawerFooter className="flex items-center bg-zinc-100 w-full">
          <button
            className="bg-zinc-900 hover:opacity-[90%] transition-all w-[270px] p-1 text-white"
            onClick={() => onEndPurchase(products)}
          >
            End purchase
          </button>
        </DrawerFooter>
      </DrawerContent>
    </>
  );
}
