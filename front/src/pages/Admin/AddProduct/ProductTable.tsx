import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Person } from "../../../interfaces/PersonInterface";
import { deletePerson, getPeople } from "../../../api/person/person.service";
import { ProductList } from "./PrdoductList";
import { Product } from "../../../interfaces/ProductInterface";
import {
  deleteProduct,
  getProducts,
} from "../../../api/product/product.service";

export function AdminTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const toast = useToast();

  const fecthProducts = () => {
    getProducts().then((data) => setProducts(data.productsList));
  };

  useEffect(() => {
    fecthProducts();
  }, []);

  const onEditProduct = (product: Product) => {
    navigate(`/product/${product.id}/update`);
  };

  const onDeleteProduct = async (product: Product) => {
    try {
      await deleteProduct(product.id);
      toast({
        position: "top-right",
        description: "Product deleted",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      fecthProducts();
    } catch (err) {
      toast({
        position: "top-right",
        description: "Error",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <ProductList
        onDelete={onDeleteProduct}
        onEdit={onEditProduct}
        products={products}
      />
    </>
  );
}
