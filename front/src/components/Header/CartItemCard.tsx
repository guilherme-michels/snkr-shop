import { Link } from "react-router-dom";
import { Product } from "../../interfaces/ProductInterface";
import { useEffect, useState } from "react";
import { getImage } from "../../api/product/product.service";
import { ShoppingCart, Trash } from "phosphor-react";
import { deleteProductPersonCart } from "../../api/person/person.service";
import { useToast } from "@chakra-ui/react";

interface CartItemProps {
  product: Product;
}

export function CartItemCard(props: CartItemProps) {
  const [image, setImage] = useState<string | undefined>(undefined);
  const toast = useToast();

  useEffect(() => {
    const fetchImage = async () => {
      const imageData = await getImage(props.product.image);
      const imageUrl = URL.createObjectURL(imageData);
      setImage(imageUrl);
    };

    fetchImage();
  }, [props.product.image]);

  // const onDeleteProductPersonCart = async (productId: string) => {
  //   try {
  //     await deleteProductPersonCart(productId);
  //     toast({
  //       position: "top-right",
  //       description: "Product removed from cart!",
  //       status: "success",
  //       duration: 1000,
  //       isClosable: true,
  //     });
  //   } catch (err) {
  //     toast({
  //       position: "top-right",
  //       description: "Error",
  //       status: "error",
  //       duration: 1000,
  //       isClosable: true,
  //     });
  //   }
  // };

  return (
    <div className="bg-zinc-50 h-auto mt-3 p-2 rounded-xl">
      <div
        className="h-[250px] flex items-end p-4 border-black"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
      <hr className="mt-2 border-zinc-400 mb-1" />
      <div className="flex flex-col">
        <div className="flex justify-between text-zinc-800">
          <div className="flex flex-col">
            <strong className="text-base"> {props.product.name}</strong>
            <span className="text-sm"> {props.product.type}</span>
          </div>
          <strong>U$ {props.product.price}</strong>
        </div>
      </div>
    </div>
  );
}
