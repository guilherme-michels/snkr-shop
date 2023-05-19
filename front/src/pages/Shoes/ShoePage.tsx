import { HeaderTemplate } from "../../templates/HeaderTemplate";
import dunklowcourtpurple2 from "../../assets/dunklowcourtpurple2.jpg";
import { useParams } from "react-router-dom";
import { getProduct, getProductSizes } from "../../api/product/product.service";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/ProductInterface";
import { addProductPersonCart } from "../../api/person/person.service";
import { useToast, Select } from "@chakra-ui/react";

export function ShoePage() {
  const params = useParams();
  const toast = useToast();
  const [product, setProduct] = useState<Product>();
  const [portionValue, setPortionValue] = useState(0);
  const [availableSizes, setAvailableSizes] = useState<number[]>([]);
  const [selectedSize, setSelectedSize] = useState(availableSizes[0]);

  const fecthProduct = async () => {
    const product = await getProduct(params.id as any);
    setProduct(product);
    setPortionValue(parseFloat((product.price / 9).toFixed(2)));
    getProductSizes(product!.id).then((data) => {
      setAvailableSizes(
        data.sizes
          .filter((size: any) => size.quantity > 0)
          .map((size: any) => size.size)
      );
    });
  };

  useEffect(() => {
    fecthProduct();
  }, []);

  const onAddProductPersonCart = async (productId: string) => {
    try {
      await addProductPersonCart(productId, selectedSize);
      toast({
        position: "top-right",
        description: "Product added to cart",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      fecthProduct();
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
      {product ? (
        <div className="h-full text-black w-full flex -mt-10">
          <div className="flex flex-col items-center w-full h-full">
            <div className="flex items-center h-full w-full flex-col justify-center">
              <div className="flex items-center justify-center w-4/5">
                <img
                  src={dunklowcourtpurple2}
                  className="shadow-md shadow-zinc-500 rounded h-[440px]"
                />

                <div className="flex flex-col items-center ml-32 w-[30%]">
                  <div className="text-2xl flex flex-col items-center mb-12">
                    <strong>{product.name.toString().toUpperCase()}</strong>
                    <span className="text-zinc-600">{product?.type}</span>

                    <span className="text-base mt-2 text-justify">
                      It's that fresh cut feeling - that top-notch freshness.
                      Jayson knows best and says it best: "When I get a cut, I
                      think I'm in the top 5."
                    </span>
                  </div>

                  <strong className="text-3xl">U$ {product?.price}</strong>
                  <span className="text-zinc-600 text-lg">
                    Or 9 times of
                    <span className="text-green font-bold">
                      {" "}
                      U$ {portionValue}
                    </span>{" "}
                    on the interest-free card
                  </span>

                  {availableSizes.length > 0 ? (
                    <div className="mt-4 w-full">
                      <Select
                        placeholder="Select option"
                        value={selectedSize}
                        onChange={(event) =>
                          setSelectedSize(Number(event.target.value))
                        }
                      >
                        {availableSizes.map((size) => (
                          <option value={size} key={size}>
                            {size}
                          </option>
                        ))}
                      </Select>
                    </div>
                  ) : null}

                  {availableSizes.length > 0 ? (
                    <button
                      className="mt-4 w-full bg-green text-white rounded-xl p-4 opacity-90 hover:opacity-100 transition-all text-xl font-bold"
                      onClick={() => onAddProductPersonCart(product.id)}
                    >
                      Add to cart
                    </button>
                  ) : (
                    <button className="cursor-not-allowed mt-4 w-full bg-green text-white rounded-xl p-4 hover:opacity-100 transition-all text-xl font-bold opacity-60">
                      Produto indisponível
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </HeaderTemplate>
  );
}
