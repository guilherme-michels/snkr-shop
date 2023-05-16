import { ShoppingCart } from "phosphor-react";
import { HeaderTemplate } from "../../templates/HeaderTemplate";
import courtPurple from "../../assets/court_purple.jpg";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/product/product.service";
import { Product } from "../../interfaces/ProductInterface";
import { addProductPersonCart } from "../../api/person/person.service";
import { useToast } from "@chakra-ui/react";

export function ShoesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const toast = useToast();

  const fetchProducts = async () => {
    const newProducts = await getProducts();
    setProducts(newProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onAddProductPersonCart = async (productId: string) => {
    try {
      await addProductPersonCart(productId);
      toast({
        position: "top-right",
        description: "Product added to cart",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      fetchProducts();
    } catch (err) {
      toast({
        position: "top-right",
        description: "Oops, this product is already in your cart",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <HeaderTemplate>
      <div className=" h-full text-black w-full flex justify-center p-8">
        <div className="grid grid-cols-6 grid-flow-row gap-4 mt-4 mb-32">
          {products.length > 0 ? (
            <>
              {products.map((product) => (
                <div key={product.id}>
                  <div
                    className="w-[200px] h-[200px] flex items-end p-4 cursor-pointer bg-[#f8f8f8] shadow-md shadow-zinc-400 hover:shadow-zinc-500 transition-all"
                    style={{
                      backgroundImage: `url(${courtPurple})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <strong
                      className="bg-zinc-500 hover:opacity-80 transition-all text-white p-1 text-sm rounded flex items-center"
                      onClick={() => onAddProductPersonCart(product.id)}
                    >
                      Add to cart
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
                </div>
              ))}
            </>
          ) : (
            <div className="flex text-2xl w-full justify-center items-center mt-10">
              How empty! It looks like this page doesn't have any products, come
              back later...
            </div>
          )}
        </div>
      </div>
    </HeaderTemplate>
  );
}
