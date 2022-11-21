import { Button, Divider, Flex, Link } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IProjectForm,
  projectCategories,
  ProjectSchema,
} from "Forms/Schema/createProjectSchema";
import { useForm } from "react-hook-form";
import InputCheckbox from "../forms/InputCheckbox";
import InputSelect from "../forms/InputSelect";
import InputText from "../forms/InputText";
import InputTextArea from "../forms/InputTextArea";

type Props = {
  handleProjectSubmit: (args: IProjectForm) => Promise<void>;
  initialValues?: Omit<IProjectForm, "terms"> | undefined;
};

const AddEditProjectForm = ({ handleProjectSubmit, initialValues }: Props) => {
  const isEditing = Boolean(Object.keys(initialValues ?? {}).length);
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, isDirty },
  } = useForm<IProjectForm>({
    mode: "all",
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
      <InputText
        control={control}
        name="image"
        helperText="Upload a project feature image"
      />
      {/* fundTarget */}
      <InputText
        control={control}
        name="fundTarget"
        helperText="Campaign funding goal"
        type="number"
        placeHolder="$0"
        disabled={isEditing}
      />
      <Flex direction="row" experimental_spaceX={8}>
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
      <Divider my="1.125rem" />
      <InputCheckbox
        control={control}
        name="terms"
        labelText="Agree to site Terms and Conditions."
        checkboxText="I agree to the Terms and Conditions."
      />

      <Flex direction="row" justifyContent="space-between">
        <Button
          as={Link}
          href="/my-account"
          my="1rem"
          type="button"
          colorScheme="red"
          size="lg"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          my="1rem"
          type="submit"
          colorScheme="blue"
          size="lg"
          disabled={isSubmitting || !isValid || !isDirty}
          isLoading={isSubmitting}
        >
          {isEditing ? "Submit Changes" : "Submit Project"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default AddEditProjectForm;
