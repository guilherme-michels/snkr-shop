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
  Checkbox,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Person } from "../../../interfaces/PersonInterface";
import {
  DotsThree,
  FilePdf,
  MagnifyingGlass,
  Pencil,
  Trash,
} from "phosphor-react";
import clsx from "clsx";
import { ModalDelete } from "../../../components/Modal/ModalDelete";
import { PDFViewer } from "@react-pdf/renderer";
import { AdminsPdf } from "./AdminListPdf";

interface AdminTableProps {
  people: Array<Person>;
  onEdit: (person: Person) => void;
  onDelete: (person: Person) => void;
}

export const AdminList: React.FunctionComponent<AdminTableProps> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [personSelected, setPersonSelected] = useState<Person | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [firstNameFilter, setFirstNameFilter] = useState(true);
  const [lastNameFilter, setLastNameFilter] = useState(false);
  const [emailFilter, setEmailFilter] = useState(false);
  const [filter, setFilter] = useState("");

  const adminFilter = props.people.filter((user) => {
    const filterLower = filter.toLowerCase();

    if (!firstNameFilter && !lastNameFilter && !emailFilter) {
      return true;
    }

    if (firstNameFilter && user.firstName.toLowerCase().includes(filterLower)) {
      return true;
    }

    if (lastNameFilter && user.lastName.toString().includes(filterLower)) {
      return true;
    }

    if (emailFilter && user.email.toLowerCase().includes(filterLower)) {
      return true;
    }

    return false;
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (name === "name") {
      setFirstNameFilter(checked);
    } else if (name === "price") {
      setLastNameFilter(checked);
    } else if (name === "type") {
      setEmailFilter(checked);
    }
  };

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
            <label className="mr-8 flex font-semibold text-zinc-500 w-32">
              First name
              <Checkbox
                className="ml-2"
                name="name"
                checked={firstNameFilter}
                onChange={handleCheckboxChange}
                defaultChecked
                size={"lg"}
              />
            </label>
            <label className="mr-8 flex font-semibold text-zinc-500 w-32">
              Last name
              <Checkbox
                className="ml-2"
                name="price"
                checked={lastNameFilter}
                onChange={handleCheckboxChange}
                size={"lg"}
              />
            </label>

            <label className="mr-8 flex font-semibold text-zinc-500 w-32">
              Email
              <Checkbox
                className="ml-2"
                name="type"
                checked={emailFilter}
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
          <AdminsPdf users={adminFilter} />
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
              <td colSpan={8}>No users</td>
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
