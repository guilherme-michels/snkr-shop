import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  DotsThree,
  FilePdf,
  MagnifyingGlass,
  Pencil,
  Trash,
} from "phosphor-react";
import clsx from "clsx";
import { ModalDelete } from "../../../components/Modal/ModalDelete";
import { ModalItem } from "../StockControl/ModalItem";
import { PDFViewer } from "@react-pdf/renderer";
import { SalesPdf } from "./SalesPdf";
import { SaleInterface } from "../../../interfaces/SaleInterface";

interface SaleTableProps {
  sales: Array<SaleInterface>;
  onDelete: (sale: SaleInterface) => void;
}

export const SalesList: React.FunctionComponent<SaleTableProps> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [saleSelected, setSaleSelected] = useState<SaleInterface | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [productNameFilter, setProductNameFilter] = useState(false);
  const [userNameFilter, setUserNameFilter] = useState(false);

  const [filter, setFilter] = useState("");

  const salesFilter = props.sales.filter((sale) => {
    const filterLower = filter.toLowerCase();

    if (!productNameFilter && !userNameFilter) {
      return true;
    }

    if (
      productNameFilter &&
      sale.product.name.toLowerCase().includes(filterLower)
    ) {
      return true;
    }

    if (
      userNameFilter &&
      sale.user.firstName.toLowerCase().includes(filterLower)
    ) {
      return true;
    }

    return false;
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (name === "clientName") {
      setUserNameFilter(checked);
    } else if (name === "productName") {
      setProductNameFilter(checked);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          marginBottom: "10px",
          marginTop: "10px",
          alignItems: "center",
        }}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center rounded mb-2 w-full ">
            <MagnifyingGlass
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              color="#696969"
              className={clsx(
                "h-10 w-10 p-1 cursor-pointer hover:opacity-80 transition-all border-solid border-[1px] border-zinc-700",
                {
                  "rounded-l-sm": isSearchOpen === true,
                  "rounded-sm": isSearchOpen === false,
                }
              )}
            />

            <input
              className={clsx(
                "bg-transparent transition-all h-10 outline-none rounded-r-sm border-solid",
                {
                  "w-[29%] border-[1px] border-l-0 placeholder p-2 border-zinc-700":
                    isSearchOpen === true,
                  "w-0 border-l-0 border-r-0": isSearchOpen === false,
                }
              )}
              placeholder="Search"
              onChange={(ev) => setFilter(ev.target.value)}
              value={filter}
            />
          </div>

          <div className=" flex items-center">
            <label className="mr-8 flex font-semibold text-zinc-500 w-40">
              Product name
              <Checkbox
                className="ml-2"
                name="productName"
                checked={productNameFilter}
                onChange={handleCheckboxChange}
                size={"lg"}
              />
            </label>

            <label className="mr-8 flex font-semibold text-zinc-500 w-40">
              Client name
              <Checkbox
                className="ml-2"
                name="clientName"
                checked={userNameFilter}
                onChange={handleCheckboxChange}
                size={"lg"}
              />
            </label>

            <FilePdf
              onClick={() => setIsPdfOpen(!isPdfOpen)}
              color="#696969"
              className={
                "h-10 w-10 p-1 cursor-pointer hover:opacity-80 transition-all border-solid border-[1px] border-zinc-700"
              }
            />
          </div>
        </div>
      </div>

      {isPdfOpen ? (
        <PDFViewer width="100%" height="100%" className="mb-4 h-screen">
          <SalesPdf sales={salesFilter} />
        </PDFViewer>
      ) : null}

      <hr className="mt-2 mb-2 border-black" />

      <Table
        variant="striped"
        colorScheme="blackAlpha"
        className="equipmentTable"
        size={"sm"}
      >
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Price</Th>
            <Th>Client</Th>
            <Th>Product</Th>
          </Tr>
        </Thead>
        <Tbody>
          {salesFilter.length > 0 ? (
            salesFilter.map((sale) => (
              <Tr key={sale.id} cursor={"pointer"}>
                <Td className="w-[20%]">
                  {new Date(sale.data).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}{" "}
                  {new Date(sale.data).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Td>
                <Td className="w-[20%]">
                  U${" "}
                  {Number(sale.valor).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </Td>
                <Td className="w-[20%]">
                  {sale.user.firstName + " " + sale.user.lastName}
                </Td>
                <Td className="w-[20%]">
                  {sale.product.name + " - " + sale.product.code}
                </Td>
                <Td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Menu>
                      <MenuButton
                        style={{
                          background: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        as={Button}
                      >
                        <DotsThree size={28} />
                      </MenuButton>
                      <MenuList style={{ minWidth: "120px" }}>
                        <MenuItem
                          onClick={() => {
                            setSaleSelected(sale);
                            setIsModalVisible(true);
                          }}
                        >
                          <div style={{ cursor: "pointer" }}>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "14px",
                              }}
                            >
                              <Trash
                                size={22}
                                color="#8f8f8f"
                                className="mr-2"
                              />{" "}
                              Delete
                            </span>
                          </div>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </div>
                </Td>
              </Tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>No Sales</td>
            </tr>
          )}
        </Tbody>
        {isModalVisible && saleSelected ? (
          <ModalDelete
            text={saleSelected.user.firstName}
            onCloseModal={() => {
              setIsModalVisible(false);
              setSaleSelected(null);
            }}
            confirmDelete={() => {
              props.onDelete(saleSelected);
              setIsModalVisible(false);
              setSaleSelected(null);
            }}
          />
        ) : null}
      </Table>
    </>
  );
};
