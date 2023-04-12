import { PropsWithChildren, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Tfoot } from "@chakra-ui/react";
import { Pagination } from "../../../components/Pagination";
import { SearchBar } from "../../../components/SearchBar";
import { ModalItem } from "./ModalItem";
import { Link } from "react-router-dom";

interface StockInfoCardProps {
  title: string;
  value: number;
  color: string;
}

export function StockTable() {
  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const totalPages = 15;
  const handlePages = (updatePage: number) => setPage(updatePage);
  return (
    <>
      <div className="flex justify-between">
        <div className="w-full">
          <SearchBar />
        </div>

        <div className="flex">
          <button className="flex items-center rounded mb-2 h-10 p-1 text-sm text-zinc-700 transition-all border-solid border-[1px] border-zinc-700 hover:opacity-80">
            Print
          </button>
          <Link to="/admin/add-product">
            <button className="ml-4 flex items-center rounded mb-2 h-10 p-1 text-sm text-zinc-700 transition-all border-solid border-[1px] border-zinc-700 hover:opacity-80">
              Add
            </button>
          </Link>
        </div>
      </div>

      <Table
        variant={"simple"}
        className="text-zinc-700 text-sm font-semibold bg-bglight rounded mt-2"
      >
        <Thead>
          <Tr>
            <Th color="#626262">Name</Th>

            <Th textAlign={"center"} color="#626262">
              Code
            </Th>

            <Th textAlign={"center"} color="#626262">
              Price
            </Th>

            <Th textAlign={"center"} color="#626262">
              Category
            </Th>

            <Th textAlign={"center"} color="#626262">
              Sizes
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr
            className="hover:text-[#686868] cursor-pointer"
            onClick={() => setIsModalVisible(true)}
          >
            <Td>Jordan 1 low </Td>
            <Td textAlign={"center"}>5519</Td>
            <Td textAlign={"center"}>5000</Td>
            <Td textAlign={"center"}>Jordan</Td>
            <Td textAlign={"center"}>42, 43, 44</Td>
          </Tr>

          <Tr
            className="hover:text-[#686868] cursor-pointer"
            onClick={() => setIsModalVisible(true)}
          >
            <Td>Jordan 1 low </Td>
            <Td textAlign={"center"}>5519</Td>
            <Td textAlign={"center"}>5000</Td>
            <Td textAlign={"center"}>Jordan</Td>
            <Td textAlign={"center"}>42, 43, 44</Td>
          </Tr>
        </Tbody>
      </Table>
      {/* <Pagination
        currentPage={page}
        perPage={12}
        totalPages={totalPages}
        handlePagination={handlePages}
      /> */}

      {isModalVisible ? (
        <ModalItem onCloseModal={() => setIsModalVisible(false)} />
      ) : null}
    </>
  );
}
