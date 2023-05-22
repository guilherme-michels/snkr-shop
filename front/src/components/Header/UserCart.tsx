import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import {
  deleteProductPersonCart,
  getPersonCart,
} from "../../api/person/person.service";
import { CartItem } from "../../interfaces/CartItem";
import { Divide, Trash } from "phosphor-react";
import { CartItemCard } from "./CartItemCard";

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

  return (
    <>
      {products.length > 0 ? (
        <div>
          {products.map((product) => (
            <CartItemCard key={product.id} product={product.product} />
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
