import { formatAmountForDisplay } from "@/utils/stripe-helpers";
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
import dayjs from "dayjs";
import React from "react";

type Props = {
  donations?: {
    __typename?: string;
    id: number;
    amount: number;
    createdAt: any;
    donor: {
      __typename?: string;
      fullName: string;
    };
  }[];
};

const BackerTablePanel = ({ donations }: Props) => {
  console.log({ donations });
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
              {donations &&
                donations.map((dono) => (
                  <Tr>
                    <Td>{dono.donor.fullName}</Td>
                    <Td>{formatAmountForDisplay(dono.amount)}</Td>
                    <Td>{dayjs(dono.createdAt).format("YYYY-MM-DD")}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </TabPanel>
  );
};

export default BackerTablePanel;
