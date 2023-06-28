import { Link } from "react-router-dom";
import { Product } from "../../interfaces/ProductInterface";
import { useEffect, useState } from "react";
import { getImage } from "../../api/product/product.service";
import { ShoppingCart, Trash } from "phosphor-react";
import { deleteProductPersonCart } from "../../api/person/person.service";
import { useToast } from "@chakra-ui/react";

interface CartItemProps {
  product: Product;
  size: number;
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

  return (
    <div className="bg-zinc-50 h-auto p-2 rounded-r-lg rounded-b-lg w-[280px] shadow-sm shadow-slate-400">
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
            <span className="text-base font-medium"> {props.product.name}</span>
            <span className="text-sm">Size {props.size}</span>
            <span className="text-sm"> {props.product.type}</span>
          </div>
          <strong className="text-base font-bold">
            U${" "}
            {Number(props.product.price).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </strong>
        </div>
      </div>
    </div>
  );
}
