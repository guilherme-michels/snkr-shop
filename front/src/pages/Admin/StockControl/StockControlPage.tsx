import { useEffect, useMemo, useState } from "react";
import { ProductTable } from "../AddProduct/ProductTable";
import { StockInfoCard } from "./StockInfoCard";
import { Product } from "../../../interfaces/ProductInterface";
import { getProducts } from "../../../api/product/product.service";

export function StockControlPage() {
  const [products, setProducts] = useState<Product[]>([]);
  // const [totalPrice, setTotalPrice] = useState<number>(0);
  const totalPrice = useMemo(() => {
    return products.reduce(
      (accumulator, product) => accumulator + Number(product.price),
      0
    );
  }, [products]);

  const fecthProducts = async () => {
    await getProducts().then((data) => setProducts(data));
  };

  useEffect(() => {
    fecthProducts();
  }, []);

  return (
    <div className="h-full flex flex-col items-center">
      <div className="w-[70%]">
        <div className="mb-4">
          <div className="text-zinc-700 text-sm font-semibold rounded flex justify-between">
            <StockInfoCard
              title="Different shoes"
              value={products.length}
              color="#1a1a1a"
            />
            <StockInfoCard
              title="Stock value"
              value={`U$ ${totalPrice.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}`}
              color="#1a1a1a"
            />
          </div>
        </div>

        <ProductTable />
      </div>
    </div>
  );
}
