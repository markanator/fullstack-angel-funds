import {
  TabPanel,
  Container,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

type Props = {};

const BackerTablePanel = (props: Props) => {
  return (
    <TabPanel>
      <Container maxW="7xl" mx="auto" py="2.5rem">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Donation Amount</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>25.4</Td>
                <Td>millimetres (mm)</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>30.48</Td>
                <Td>centimetres (cm)</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>0.91444</Td>
                <Td>metres (m)</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </TabPanel>
  );
};

export default BackerTablePanel;
