import { formatAmountForDisplay } from "@/utils/stripe-helpers";
import { Button, Flex, List, ListItem } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputNumber from "../forms/InputNumber";
import InputSelect from "../forms/InputSelect";
import InputText from "../forms/InputText";
import InputTextArea from "../forms/InputTextArea";
import {
  ICreateRewardFormData,
  months,
  RewardSchema,
  years,
} from "./rewards.utils";

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

  onCreateReward: (formValues: ICreateRewardFormData) => Promise<void>;
};

const AddEditProjectRewards = ({ existingRewards, onCreateReward }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm<ICreateRewardFormData>({
    mode: "all",
    resolver: yupResolver(RewardSchema),
  });

  useEffect(() => {
    if (existingRewards && existingRewards?.length > 0) {
      const firstItem = existingRewards[0];
      reset({
        ...(firstItem as any),
        amount: formatAmountForDisplay(firstItem.amount),
        image: firstItem?.image ?? "",
      });
    }
  }, []);

  const isEditing = Boolean(existingRewards?.length);

  return (
    <Flex
      flexDirection="column"
      border="1px solid"
      borderColor="progress_bg"
      p="2rem"
      boxShadow="lg"
      bgColor="white"
    >
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
            placeholder: "$150.00",
          }}
          disabled={isEditing}
        />
        <InputText
          control={control}
          name="title"
          helperText="Put the reward title here"
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
          helperText="Put the reward description here"
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
            allowNegative: false,
            placeholder: "250",
          }}
          helperText="Quantity of physical products"
        />
        <Flex mt={8} justifyContent="space-between">
          <Button
            as={Link}
            href="/my-account/projects"
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
            disabled={!isValid || !isDirty || isSubmitting}
            isLoading={isSubmitting}
          >
            {isEditing ? "Update Reward" : "Add Reward"}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AddEditProjectRewards;
