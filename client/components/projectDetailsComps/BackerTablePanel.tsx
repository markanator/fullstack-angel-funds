import { formatAmountForDisplay } from "@/utils/stripe-helpers";
import { Container, Table, Tabs } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";

type Props = {
  value: string;
  showNames?: boolean;
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

const BackerTablePanel = ({ value, donations, showNames = true }: Props) => {
  return (
    <Tabs.Content value={value}>
      <Container maxW="7xl" mx="auto" py="2.5rem">
        <Table.ScrollArea>
          <Table.Root variant="line">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader>Donation Amount</Table.ColumnHeader>
                <Table.ColumnHeader>Date</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {donations &&
                donations.map((dono) => (
                  <Table.Row key={dono.id}>
                    <Table.Cell>
                      {showNames ? dono.donor.fullName : "Anonymous"}
                    </Table.Cell>
                    <Table.Cell>{formatAmountForDisplay(dono.amount)}</Table.Cell>
                    <Table.Cell>
                      {dayjs(dono.createdAt).format("YYYY-MM-DD")}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Container>
    </Tabs.Content>
  );
};

export default BackerTablePanel;
