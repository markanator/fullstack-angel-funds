import { apiFetcher } from "@/utils/api-helpers";
import getStripe from "@/utils/getStripe";
import { formatAmountForDisplay } from "@/utils/stripe-helpers";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { FaMedal } from "react-icons/fa";

interface IReward {
  __typename?: "Reward" | undefined;
  id: number;
  amount: number;
  image?: string | null | undefined;
  title: string;
  description: string;
  deliveredByMonth: any;
  deliveredByYear: any;
  quantityRemaining: number;
}

type Props = {
  reward: IReward;
};

const RewardsCard = ({ reward }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = router.query;

  const onClaimReward = useCallback(async () => {
    setIsLoading(true);
    console.log("Claiming a reward:", reward);
    try {
      const res = await apiFetcher<{ id?: string }>("/api/donations/rewards", {
        method: "POST",
        body: JSON.stringify({
          rewardAmount: reward.amount,
          projectSlug: slug as string,
          rewardTitle: reward.title,
          rewardDescription: reward.description.slice(0, 144),
          rewardImg: reward.image,
        }),
      });

      console.log("FETCH CALL RESPONSE:::", res);
      setIsLoading(false);
      if (!!res?.id) {
        //* redirect to checkout
        const stripe = await getStripe();
        const result = await stripe!.redirectToCheckout({
          sessionId: res.id,
        });

        console.log("STRIPE REDIRECT RES:::", result);
        if (result?.error) {
          console.warn(result?.error?.message);
        }
        //* API:: Create a Checkout Session.
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [reward, slug]);
  return (
    <Flex flexDir="column" py="50px" px="30px" bgColor="gray.100">
      <Heading as="p" fontSize={20}>
        <Box as="span" color="color_alt">
          {formatAmountForDisplay(reward.amount)}
        </Box>{" "}
        or more
      </Heading>
      {reward.image && (
        <Box my={8}>
          <Image src={reward?.image} alt={reward.title} />
        </Box>
      )}
      <Text
        mt={2}
        fontWeight="semibold"
        letterSpacing="wide"
        color="text_secondary"
        textTransform="capitalize"
      >
        {reward.title}
      </Text>
      <Text
        mt={2}
        letterSpacing="wide"
        color="text_secondary"
        textTransform="capitalize"
        whiteSpace="pre-wrap"
      >
        {reward.description}
      </Text>
      <Text mt={2} fontWeight="bold">
        {reward.deliveredByMonth}, {reward.deliveredByYear}
      </Text>
      <Text
        mt={2}
        fontWeight="medium"
        letterSpacing="wide"
        color="text_secondary"
      >
        Estimated Delivery
      </Text>
      <Text
        mt={2}
        fontWeight="medium"
        letterSpacing="wide"
        color="text_secondary"
        display="inline-flex"
        alignItems="center"
        mb={6}
      >
        <FaMedal style={{ marginRight: "8px" }} />
        {reward.quantityRemaining} total rewards
      </Text>
      <Button
        type="button"
        letterSpacing="3px"
        backgroundColor="color_alt"
        _hover={{
          backgroundColor: "color_primary",
        }}
        color="white"
        fontWeight="bold"
        size="lg"
        rounded="none"
        disabled={isLoading}
        isLoading={isLoading}
        onClick={onClaimReward}
      >
        Select Reward
      </Button>
    </Flex>
  );
};

export default RewardsCard;
