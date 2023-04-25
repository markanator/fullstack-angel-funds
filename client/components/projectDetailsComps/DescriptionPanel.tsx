import {
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import RewardsCard from "./RewardsCard";

type Props = {
  description: string;
  rewards?: {
    __typename?: "Reward";
    id: number;
    amount: number;
    image?: string | null;
    title: string;
    description: string;
    deliveredByMonth: any;
    deliveredByYear: any;
    quantityRemaining: number;
  }[];
};

const DescriptionPanel = ({ description, rewards }: Props) => {
  return (
    <TabPanel m="auto">
      <Container maxW="7xl" mx="auto" py="2.5rem">
        <Flex gap={8}>
          {/* LEFT DESCRIPTION */}
          <Flex as="article" w="66%" direction="column">
            <Heading as="p" mb=".5rem">
              Description
            </Heading>
            <Text color="text_tertiary" whiteSpace="pre-wrap">
              {description}
            </Text>
          </Flex>
          {/* RIGHT */}
          <Flex as="aside" w="33%" flexDir="column">
            <Heading as="p" mb=".5rem">
              Rewards
            </Heading>
            {rewards && (
              <List display="flex" flexDir="column">
                {rewards.map((reward) => (
                  <ListItem key={reward.id}>
                    <RewardsCard reward={reward} />
                  </ListItem>
                ))}
              </List>
            )}
            {/* TODO: show rewards */}
          </Flex>
        </Flex>
      </Container>
    </TabPanel>
  );
};

export default DescriptionPanel;
