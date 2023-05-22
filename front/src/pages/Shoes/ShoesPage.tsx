import { ShoppingCart } from "phosphor-react";
import { HeaderTemplate } from "../../templates/HeaderTemplate";
import courtPurple from "../../assets/court_purple.jpg";
import { useEffect, useState } from "react";
import { getImage, getProducts } from "../../api/product/product.service";
import { Product } from "../../interfaces/ProductInterface";
import { Link } from "react-router-dom";
import { ShoeCard } from "./ShoeCard";

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
                <ShoeCard product={product} key={product.id} />
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
