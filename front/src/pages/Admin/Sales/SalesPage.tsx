import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { SalesList } from "./SalesList";
import { deleteSale, getSales } from "../../../api/product/product.service";
import { SaleInterface } from "../../../interfaces/SaleInterface";

export function SalesPage() {
  const [sales, setSales] = useState<SaleInterface[]>([]);
  const toast = useToast();

  const fetchSales = () => {
    getSales().then((data) => setSales(data.sales));
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const onDeleteSale = async (sale: SaleInterface) => {
    try {
      await deleteSale(sale.id);
      toast({
        position: "top-right",
        description: "Sale deleted",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      fetchSales();
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
      <SalesList onDelete={onDeleteSale} sales={sales} />
    </>
  );
}
