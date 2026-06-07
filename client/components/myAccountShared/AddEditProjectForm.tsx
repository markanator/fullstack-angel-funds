import { Button, Flex, Separator } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { IProjectForm, projectCategories, ProjectSchema } from "Forms/Schema/createProjectSchema";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import InputCheckbox from "../forms/InputCheckbox";
import InputNumber from "../forms/InputNumber";
import InputSelect from "../forms/InputSelect";
import InputText from "../forms/InputText";
import InputTextArea from "../forms/InputTextArea";

type Props = {
  handleProjectSubmit: (args: IProjectForm) => Promise<void>;
  initialValues?: Omit<IProjectForm, "terms">;
};

const AddEditProjectForm = ({ handleProjectSubmit, initialValues }: Props) => {
  const isEditing = Boolean(Object.keys(initialValues ?? {}).length);
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, isDirty },
  } = useForm<IProjectForm, any, IProjectForm>({
    mode: "all",
    // @ts-ignore TODO: use Zod instead of Yup
    resolver: yupResolver(ProjectSchema),
    defaultValues: initialValues,
  });

  return (
    <Flex
      as="form"
      flexDirection="column"
      onSubmit={handleSubmit(handleProjectSubmit)}
      border="1px solid"
      borderColor="progress_bg"
      p="2rem"
      boxShadow="lg"
      bgColor="white"
    >
      {/* title */}
      <InputText
        control={control}
        name="title"
        helperText="Put the campaign title here"
        disabled={isEditing}
      />
      {/* description */}
      <InputTextArea
        control={control}
        name="description"
        helperText="Put the campaign description here"
      />
      {/* category */}
      <InputSelect
        control={control}
        name="category"
        options={projectCategories}
        helperText="Select your campaign category"
      />
      {/* image */}
      <InputText control={control} name="image" helperText="Upload a project feature image" />
      {/* fundTarget */}
      <InputNumber
        control={control}
        name="fundTarget"
        helperText="Campaign funding goal"
        type="number"
        disabled={isEditing}
        numberInputProps={{
          thousandSeparator: ",",
          prefix: "$",
          decimalScale: 2,
          decimalSeparator: ".",
          allowNegative: false,
          placeholder: "$10,000.00",
        }}
      />
      <Flex direction="row" gap={8}>
        {/* publishDate */}
        <InputText
          control={control}
          name="publishDate"
          type="date"
          helperText="Campaign start date (mm-dd-yyyy)"
          disabled={isEditing}
        />
        <InputText
          control={control}
          name="targetDate"
          type="date"
          helperText="Campaign end date (mm-dd-yyyy)"
          disabled={isEditing}
        />
        {/* targetDate */}
      </Flex>
      {/* terms and conditions */}
      <Separator my="1.125rem" />
      <InputCheckbox
        control={control}
        name="terms"
        labelText="Agree to site Terms and Conditions."
        checkboxText="I agree to the Terms and Conditions."
      />

      <Flex direction="row" justifyContent="space-between">
        <Button my="1rem" colorPalette="red" size="lg" asChild>
          <NextLink href="/my-account/projects">Cancel</NextLink>
        </Button>

        <Button
          my="1rem"
          type="submit"
          colorPalette="blue"
          size="lg"
          disabled={isSubmitting || !isValid || !isDirty}
          loading={isSubmitting}
        >
          {isEditing ? "Submit Changes" : "Submit Project"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default AddEditProjectForm;
