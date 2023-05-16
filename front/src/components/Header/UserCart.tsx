import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import {
  deleteProductPersonCart,
  getPersonCart,
} from "../../api/person/person.service";
import { CartItem } from "../../interfaces/CartItem";
import { Divide, Trash } from "phosphor-react";

export function UserCart() {
  const [products, setProducts] = useState<CartItem[]>([]);
  const toast = useToast();

  const fetchUserCart = async () => {
    const newProducts = await getPersonCart();
    setProducts(newProducts);
  };

  useEffect(() => {
    fetchUserCart();
  }, []);

  const onDeleteProductPersonCart = async (productId: string) => {
    try {
      await deleteProductPersonCart(productId);
      toast({
        position: "top-right",
        description: "Product removed from cart!",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      fetchUserCart();
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
      {products.length > 0 ? (
        <div>
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-50 h-auto mt-3 p-2 rounded-xl"
            >
              <div className="bg-red h-40 w-full p-2 rounded-xl">
                <Trash
                  className="cursor-pointer"
                  size={20}
                  onClick={() => onDeleteProductPersonCart(product.id)}
                />
              </div>
              <hr className="mt-2 border-zinc-400 mb-1" />
              <div className="flex flex-col">
                <div className="flex justify-between text-zinc-800">
                  <strong> {product.product.name}</strong>
                  <strong>U$ {product.product.price}</strong>
                </div>
                <span className="text-sm text-zinc-700"> Size: 42</span>
                <span className="text-sm">Quantity: {product.quantity}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center text-xl">
          Your cart is empty!
        </div>
      )}
    </>
  );
}
