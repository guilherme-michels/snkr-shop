import { ShoppingCart } from "phosphor-react";
import { HeaderTemplate } from "../../templates/HeaderTemplate";
import courtPurple from "../../assets/court_purple.jpg";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/product/product.service";
import { Product } from "../../interfaces/ProductInterface";
import { addProductPersonCart } from "../../api/person/person.service";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function ShoesPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const newProducts = await getProducts();
    setProducts(newProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <HeaderTemplate>
      <div className=" h-full text-black w-full flex justify-center p-8">
        <div className="grid grid-cols-6 grid-flow-row gap-4 mt-4 mb-32">
          {products.length > 0 ? (
            <>
              {products.map((product) => (
                <div key={product.id}>
                  <Link to={`/shoes/${product.id}/see`}>
                    <div
                      className="w-[200px] h-[200px] flex items-end p-4 bg-[#f8f8f8] shadow-md shadow-zinc-400 hover:shadow-zinc-500 transition-all"
                      style={{
                        backgroundImage: `url(${courtPurple})`,
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
                      <strong className="text-base">{product.name}</strong>
                      <span className="text-sm text-zinc-500">
                        {product.type}
                      </span>
                      <span>U$ {product.price}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </>
          ) : (
            <div className="absolute text-2xl left-1/3 w-1/3 text-center">
              How empty! It looks like this page doesn't have any products, come
              back later...
            </div>
          )}
        </div>
      </div>
    </HeaderTemplate>
  );
}
