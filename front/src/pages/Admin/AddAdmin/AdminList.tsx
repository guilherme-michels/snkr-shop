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
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Person } from "../../../interfaces/PersonInterface";
import { DotsThree, MagnifyingGlass, Pencil, Trash } from "phosphor-react";
import clsx from "clsx";
import { ModalDelete } from "./ModalDelete";

interface AdminTableProps {
  people: Array<Person>;
  onEdit: (person: Person) => void;
  onDelete: (person: Person) => void;
}

export const AdminList: React.FunctionComponent<AdminTableProps> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [personSelected, setPersonSelected] = useState<Person | null>(null);
  const [filter, setFilter] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const personFilter = props.people.filter((person) =>
    person.firstName.toLowerCase().includes(filter.toLowerCase())
  );

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
      >
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Last name</Th>
            <Th>Email</Th>
            <Th>Position</Th>
            <Th>Phone</Th>
            <Th>Cpf</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {personFilter.length > 0 ? (
            personFilter.map((person) => (
              <Tr key={person.id}>
                <Td>{person.firstName}</Td>
                <Td>{person.lastName}</Td>
                <Td>{person.email}</Td>

                <Td>{person.position}</Td>
                <Td>{person.phone}</Td>
                <Td>{person.cpf}</Td>

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
                        <MenuItem onClick={() => props.onEdit(person)}>
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
                              />{" "}
                              Edit
                            </span>
                          </div>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setPersonSelected(person);
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
              <td colSpan={8}>Sem equipamentos cadastrados</td>
            </tr>
          )}
        </Tbody>
        {isModalVisible && personSelected ? (
          <ModalDelete
            text={personSelected.firstName}
            onCloseModal={() => {
              setIsModalVisible(false);
              setPersonSelected(null);
            }}
            confirmDelete={() => {
              props.onDelete(personSelected);
              setIsModalVisible(false);
              setPersonSelected(null);
            }}
          />
        ) : null}
      </Table>
    </>
  );
};
