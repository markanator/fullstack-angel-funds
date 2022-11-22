import { Button, Flex, List, ListItem } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import InputNumber from "../forms/InputNumber";
import InputSelect from "../forms/InputSelect";
import InputText from "../forms/InputText";
import InputTextArea from "../forms/InputTextArea";
import { IFormData, months, RewardSchema, years } from "./rewards.utils";

type Props = {
  existingRewards?: {
    __typename?: "Reward";
    id: number;
    amount: number;
    image?: string | null;
    description: string;
    deliveredByMonth: any;
    deliveredByYear: any;
    quantityRemaining: number;
  }[];
};

const AddEditProjectRewards = ({ existingRewards }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IFormData>({
    mode: "all",
    resolver: yupResolver(RewardSchema),
  });

  const onCreateReward = (formValues: IFormData) => {
    console.log({ formValues });
  };
  return (
    <Flex
      flexDirection="column"
      border="1px solid"
      borderColor="progress_bg"
      p="2rem"
      boxShadow="lg"
      bgColor="white"
    >
      {!existingRewards?.length ? (
        <Flex
          direction="column"
          as="form"
          onSubmit={handleSubmit(onCreateReward)}
        >
          <InputNumber
            control={control}
            name="amount"
            helperText="Pledge amount"
            numberInputProps={{
              thousandSeparator: ",",
              prefix: "$",
              decimalScale: 2,
              decimalSeparator: ".",
              allowNegative: false,
              // valueIsNumericString: true,
              defaultValue: "150.00",
            }}
          />
          <InputText
            control={control}
            name="image"
            helperText="Upload a reward image"
          />
          <InputTextArea
            control={control}
            name="description"
            rows={3}
            helperText="Put the reward title here"
          />
          <Flex experimental_spaceX={4}>
            <InputSelect
              control={control}
              name="deliveredByMonth"
              options={months}
              helperText="Estimated Delivery Month"
            />
            <InputSelect
              control={control}
              name="deliveredByYear"
              options={years}
              helperText="Estimated Delivery Year"
            />
          </Flex>
          <InputNumber
            control={control}
            name="quantityRemaining"
            numberInputProps={{
              thousandSeparator: ",",
              suffix: " items",
              allowNegative: false,
              defaultValue: "250",
            }}
            helperText="Quantity of physical products"
          />
          <Flex mt={8} justifyContent="space-between">
            <Button
              as={Link}
              href="/my-account"
              type="button"
              colorScheme="red"
              size="lg"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Add Reward
            </Button>
          </Flex>
        </Flex>
      ) : null}
      {Boolean(existingRewards?.length) ? (
        <List>
          {existingRewards?.map((rew) => (
            <ListItem key={rew?.id}>{rew.id}</ListItem>
          ))}
        </List>
      ) : null}
    </Flex>
  );
};

export default AddEditProjectRewards;
