import { Container, Flex, Heading, List, Tabs, Text } from "@chakra-ui/react";
import RewardsCard from "./RewardsCard";

type Props = {
  value: string;
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

const DescriptionPanel = ({ value, description, rewards }: Props) => {
  return (
    <Tabs.Content value={value} m="auto">
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
            {
              !rewards?.length ? (
                <Text>
                  This project has no rewards yet.
                </Text>
              ) : null
            }
            {rewards && (
              <List.Root display="flex" flexDir="column">
                {rewards.map((reward) => (
                  <List.Item key={reward.id}>
                    <RewardsCard reward={reward} />
                  </List.Item>
                ))}
              </List.Root>
            )}
            {/* TODO: show rewards */}
          </Flex>
        </Flex>
      </Container>
    </Tabs.Content>
  );
};

export default DescriptionPanel;
