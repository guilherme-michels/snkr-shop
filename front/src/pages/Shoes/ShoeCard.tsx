import { Link } from "react-router-dom";
import { Product } from "../../interfaces/ProductInterface";
import { useCallback, useEffect, useState } from "react";
import { getImage } from "../../api/product/product.service";
import { ShoppingCart } from "phosphor-react";

interface ShoeCardProps {
  product: Product;
}

export function ShoeCard(props: ShoeCardProps) {
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchImage = async () => {
      const imageData = await getImage(props.product.image);
      const imageUrl = URL.createObjectURL(imageData);
      setImage(imageUrl);
    };

    fetchImage();
  }, [props.product.image]);

  return (
    <div>
      <Link to={`/shoes/${props.product.id}/see`}>
        <div
          className="w-[200px] h-[200px] flex items-end p-4 bg-[#f8f8f8] shadow-md shadow-zinc-400 hover:shadow-zinc-500 transition-all"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        >
          <strong className="cursor-pointer bg-zinc-500 hover:opacity-80 transition-all text-white p-1 text-sm rounded flex items-center">
            View
            <ShoppingCart color="#fff" size={16} className="ml-2" />
          </strong>
        </div>
        <div className="p-1 flex flex-col">
          <strong className="text-base">{props.product.name}</strong>
          <span className="text-sm text-zinc-500">{props.product.type}</span>
          <span>U$ {props.product.price}</span>
        </div>
      </Link>
    </div>
  );
}
