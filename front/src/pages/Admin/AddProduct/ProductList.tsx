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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { DotsThree, MagnifyingGlass, Pencil, Trash } from "phosphor-react";
import clsx from "clsx";
import { ModalDelete } from "../../../components/Modal/ModalDelete";
import { Product } from "../../../interfaces/ProductInterface";
import { ModalItem } from "../StockControl/ModalItem";

interface ProductTableProps {
  products: Array<Product>;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const ProductList: React.FunctionComponent<ProductTableProps> = (
  props
) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalSizesVisible, setisModalSizesVisible] = useState(false);
  const [productSelected, setProductSelected] = useState<Product | null>(null);
  const [filter, setFilter] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const productFilter =
    props.products && Array.isArray(props.products)
      ? props.products.filter((product) =>
          product.name.toLowerCase().includes(filter.toLowerCase())
        )
      : [];

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
        <div className="flex items-center rounded mb-2 w-full">
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
      </div>

      <Table
        variant="striped"
        colorScheme="blackAlpha"
        className="equipmentTable"
        size={"sm"}
      >
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Type</Th>
            <Th>Code</Th>
          </Tr>
        </Thead>
        <Tbody>
          {productFilter.length > 0 ? (
            productFilter.map((product) => (
              <Tr key={product.id} cursor={"pointer"}>
                <Td
                  onClick={() => {
                    setProductSelected(product);
                    setisModalSizesVisible(true);
                  }}
                >
                  {product.name}
                </Td>
                <Td>{product.type}</Td>
                <Td>{product.code}</Td>
                <Td>{product.price}</Td>
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
                        <MenuItem onClick={() => props.onEdit(product)}>
                          <div style={{ cursor: "pointer" }}>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "14px",
                              }}
                            >
                              <Pencil
                                size={22}
                                color="#8f8f8f"
                                className="mr-2"
                              />
                              Edit
                            </span>
                          </div>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setProductSelected(product);
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
              <td colSpan={8}>No Products</td>
            </tr>
          )}
        </Tbody>
        {isModalVisible && productSelected ? (
          <ModalDelete
            text={productSelected.name}
            onCloseModal={() => {
              setIsModalVisible(false);
              setProductSelected(null);
            }}
            confirmDelete={() => {
              props.onDelete(productSelected);
              setIsModalVisible(false);
              setProductSelected(null);
            }}
          />
        ) : null}

        {isModalVisible && productSelected ? (
          <ModalDelete
            text={productSelected.name}
            onCloseModal={() => {
              setIsModalVisible(false);
              setProductSelected(null);
            }}
            confirmDelete={() => {
              props.onDelete(productSelected);
              setIsModalVisible(false);
              setProductSelected(null);
            }}
          />
        ) : null}

        {isModalSizesVisible && productSelected ? (
          <ModalItem
            product={productSelected}
            onCloseModal={() => {
              setIsModalVisible(false);
              setProductSelected(null);
            }}
          />
        ) : null}
      </Table>
    </>
  );
};
