import { HeaderTemplate } from "../../templates/HeaderTemplate";
import { useCallback, useEffect, useState } from "react";
import { getPersonCart } from "../../api/person/person.service";
import { addSales, getSalesByUser } from "../../api/product/product.service";
import { CartItem } from "../../interfaces/CartItem";
import { useToast } from "@chakra-ui/react";
import { CartItemCard } from "../../components/Header/CartItemCard";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";

export function EndPurchasePage(): JSX.Element {
  const [products, setProducts] = useState<CartItem[]>([]);
  const toast = useToast();
  const [valorTotal, setValorTotal] = useState<number>(0);

  const fetchUserCart = async () => {
    const newProducts = await getPersonCart();
    setProducts(newProducts);
  };

  useEffect(() => {
    fetchUserCart();
  }, []);

  const fetchProducts = useCallback(() => {
    getPersonCart().then((data) => {
      setProducts(data);
      calculateTotalValue(data);
    });
  }, [products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const onEndPurchase = async (products: CartItem[]) => {
    try {
      await addSales(products);
      toast({
        position: "top-right",
        description: "Compra finalizada, obrigado por comprar conosco!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchProducts();
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

  const handleDeleteItem = (itemId: string) => {
    const updatedProducts = products.filter((product) => product.id !== itemId);
    setProducts(updatedProducts);
    toast({
      title: "Item removed",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    calculateTotalValue(updatedProducts);
  };

  const calculateTotalValue = (products: CartItem[]) => {
    let total = 0;
    products.forEach((product) => {
      total += Number(product.product.price);
    });
    setValorTotal(total);
  };

  return (
    <HeaderTemplate>
      <div className="h-full text-black flex p-4  justify-center w-full">
        {products.length > 0 ? (
          <>
            <div>
              <span className="text-lg font-bold">My items</span>
              <div className="grid grid-cols-2 grid-flow-row gap-10">
                {products.map((product) => (
                  <CartItemCard
                    product={product.product}
                    size={product.size}
                    key={product.id}
                  />
                ))}
              </div>
            </div>

            <div className="ml-10 w-2/6 flex flex-col items-center">
              <span className="text-lg font-bold w-full">
                Others informations
              </span>

              <div className="border-[1px] border-zinc-400 p-4 rounded w-full">
                <div className="w-full text-xl">
                  Total: U${" "}
                  {valorTotal.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </div>

                <hr className="mt-2 border-zinc-400 mb-2" />

                <div>
                  <label>DISCOUNT COUPON</label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder=""
                      className="w-full p-1 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                    />
                    <button className="bg-black text-white mr-2 ml-2 p-2 rounded">
                      Calculate
                    </button>
                  </div>
                </div>

                <div>
                  <label>CEP</label>
                  <input
                    type="text"
                    placeholder="CEP"
                    className="w-full p-1 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                  />
                </div>
              </div>

              <button
                className="bg-green hover:opacity-[90%] transition-all w-[270px] p-3 text-white mt-4 text-xl rounded-xl"
                onClick={() => onEndPurchase(products)}
              >
                Finish buy
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex items-center flex-col">
              <div className="text-2xl">
                How empty!{" "}
                <Link
                  to="/shoes"
                  className="text-green cursor-pointer hover:opacity-70 "
                >
                  add items to your cart
                </Link>{" "}
                to checkout...
              </div>
              <ShoppingCart size={126} className="mt-8" color="#1b1b1b" />
            </div>
          </>
        )}
      </div>
    </HeaderTemplate>
  );
}
