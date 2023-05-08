import React, { memo } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Trash } from "phosphor-react";

export interface FileListProps {
  file: File;
  onDeleteFile: () => void;
}

export const FileList = memo(
  (props: React.PropsWithChildren<FileListProps>) => (
    <div>
      <TableContainer key={`${props.file.name}_${props.file.lastModified}`}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name:</Th>
              <Th>Size:</Th>
              <Th style={{ width: "5%" }}></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{props.file.name}</Td>
              <Td>{Math.round(props.file.size / 1000)} Kb</Td>
              <Td style={{ width: "5%" }}>
                <Trash
                  size={22}
                  color="#8f8f8f"
                  onClick={() => {
                    props.onDeleteFile();
                  }}
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
);

FileList.displayName = "FileList";
