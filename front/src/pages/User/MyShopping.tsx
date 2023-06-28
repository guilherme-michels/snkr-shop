import { HeaderTemplate } from "../../templates/HeaderTemplate";
import { useEffect, useState } from "react";
import { SaleInterface } from "../../interfaces/SaleInterface";
import { getImage } from "../../api/product/product.service";
import { Link } from "react-router-dom";

interface MyShoppingProps {
  sale: SaleInterface;
}

export function MyShopping(props: MyShoppingProps) {
  const [image, setImage] = useState<string>();

  useEffect(() => {
    const fetchImage = async () => {
      if (props.sale) {
        const imageData = await getImage(props.sale.product.image);
        const imageUrl = URL.createObjectURL(imageData);
        setImage(imageUrl);
      }
    };

    fetchImage();
  }, [props.sale.product.image]);

  return (
    <div className="w-full border-zinc-400 border-[1px] h-32 mt-4 rounded p-2 flex">
      <div className="flex flex-col text-center w-2/3 text-zinc-600 items-center">
        <span className="text-xs">
          Purchased on:{" "}
          <span className="text-sm font-bold">
            {new Date(props.sale.data).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}{" "}
            {new Date(props.sale.data).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </span>
        <span className="text-sm">
          Product: {props.sale.product.name} - {props.sale.size}
        </span>
        <span className="font-bold">U$ {props.sale.valor}</span>
        <Link to={`/shoes/${props.sale.product.id}/see`} className="w-full">
          <button className="w-2/6 bg-green text-white rounded-xl p-1 opacity-90 hover:opacity-100 transition-all mt-6 text-xs">
            See product
          </button>
        </Link>
      </div>

      <div>
        <img src={image} className="shadow-md rounded h-28" />
      </div>
    </div>
  );
}
