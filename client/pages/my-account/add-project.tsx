import {
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  Textarea,
  useNumberInput,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FreshProjectSchema } from "Forms/Schema/createProjectSchema";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useIsAuth } from "@/Queries/useIsAuth";
import AuthBanner from "../../components/authShared/AuthBanner";
import Layout from "../../components/Layout";
import { useMutation } from "react-query";
import { createNewProject } from "@/async/projects";

interface IFormInputs {
  title: string;
  description: string;
  category: string;
  image: string;
  currentFunds: number;
  fundTarget: number;
  publishDate: string;
  targetDate: string;
  terms: boolean;
}

export default function AddProjectPage() {
  const { checksOut } = useIsAuth(); //logged in user
  const router = useRouter(); // for nav

  // form stuff
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "all",
    resolver: yupResolver(FreshProjectSchema),
  });

  const {mutate} = useMutation((payload: any) => createNewProject(payload))

  const toast = useToast();

  const onSubmit = async (formData: IFormInputs) => {
    const project = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      image: formData.image,
      fundTarget: formData.fundTarget,
      publishDate: formData.publishDate,
      targetDate: formData.targetDate,
      currentFunds: 0,
      totalDonation_sum: 0,
      viewCount: 0,
      votePoints: 0,
    };

    mutate(project, {
      onSuccess: (data, vars)=> {
        toast({
          title: "Project created.",
          description: `Your Project: ${data.title}, was successfully created.`,
          status: "success",
          duration: 9000,
          isClosable: true,
          onCloseComplete: () => router.push(`/project/${data.slug}`)
        });
      },
      onError: (e)=> {
        // @ts-ignore
        console.error(e?.message);
        toast({
          title: "Oh, snap. An error happened.",
          description: `Your Project: ${project.title}, was not created.`,
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      }
    });
  };

  // console.log("add project props", user);
  if (checksOut) {
    return (
      <Layout SEO={{ title: "Add a Project - VR Funds" }}>
        <AuthBanner bgImage="/images/breadcrumb.png" title="Add a Project" />
        <Flex bgColor='gray.200'>
        <Container maxW="6xl" py="5rem">
          <Flex
            as="form"
            flexDirection="column"
            onSubmit={handleSubmit(onSubmit)}
            border="1px solid"
            borderColor="progress_bg"
            p="2rem"
            boxShadow="lg"
            bgColor="white"
          >
            {/* title */}
            <FormControl id="title" mb="1.125rem">
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                name="title"
                type="text"
                {...register("title")}
                isInvalid={errors?.title}
                border="1px solid"
                borderColor="progress_bg"
                rounded="none"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
              />
              <FormHelperText>Put the campaign title here</FormHelperText>
              <Text fontSize="sm" color="color_alt">
                {errors.title?.message}
              </Text>
            </FormControl>

            {/* description */}
            <FormControl id="description" mb="1.125rem">
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                name="description"
                {...register("description")}
                isInvalid={errors?.description}
                row="12"
                col="12"
                h='250px'
                // type='textarea'
                border="1px solid"
                borderColor="progress_bg"
                rounded="none"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
              />
              <FormHelperText>Put the campaign description here</FormHelperText>
              <Text fontSize="sm" color="color_alt">
                {errors.description?.message}
              </Text>
            </FormControl>

            {/* category */}
            <FormControl id="category" mb="1.125rem">
              <FormLabel htmlFor="category">Category</FormLabel>
              <Select
                name="category"
                placeholder="Select option"
                {...register("category")}
                isInvalid={errors?.category}
              >
                <option value="Design">Design</option>
                <option value="Education">Education</option>
                <option value="Fashion">Fashion</option>
                <option value="Fine_Arts">Fine Arts</option>
                <option value="Medical">Medical</option>
                <option value="Technology">Technology</option>
              </Select>
              <FormHelperText>Select your campaign category</FormHelperText>
              <Text fontSize="sm" color="color_alt">
                {errors.category?.message}
              </Text>
            </FormControl>

            {/* image */}
            <FormControl id="image" mb="1.125rem">
              <FormLabel htmlFor="image">Feature Image</FormLabel>
              <Input
                name="image"
                {...register("image")}
                isInvalid={errors?.image}
                placeholder="https://..."
                border="1px solid"
                borderColor="progress_bg"
                rounded="none"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
              />
              <FormHelperText>Upload a campaign feature image</FormHelperText>
              <Text fontSize="sm" color="color_alt">
                {errors.image?.message}
              </Text>
            </FormControl>

            {/* fundTarget */}
            <FormControl id="fundTarget" mb="1.125rem">
              <FormLabel htmlFor="fundTarget">Fund Target</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="$"
                />
                <Input
                  name="fundTarget"
                  type="number"
                  placeholder="0"
                  {...register("fundTarget")}
                  isInvalid={errors?.fundTarget}
                  border="1px solid"
                  borderColor="progress_bg"
                  rounded="none"
                  boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
                />
              </InputGroup>
              <FormHelperText>Campaign funding goal</FormHelperText>
              <Text fontSize="sm" color="color_alt">
                {errors.fundTarget?.message}
              </Text>
            </FormControl>

            <Flex direction="row">
              {/* publishDate */}
              <FormControl id="publishDate" mb="1.125rem" mr="1rem">
                <FormLabel htmlFor="publishDate">Start Date</FormLabel>
                <Input
                  name="publishDate"
                  type="date"
                  {...register("publishDate")}
                  isInvalid={errors?.publishDate}
                  border="1px solid"
                  borderColor="progress_bg"
                  rounded="none"
                  boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
                />
                <FormHelperText>
                  Campaign start date (mm-dd-yyyy)
                </FormHelperText>
                <Text fontSize="sm" color="color_alt">
                  {errors.publishDate?.message}
                </Text>
              </FormControl>

              {/* targetDate */}
              <FormControl id="targetDate" mb="1.125rem" ml="1rem">
                <FormLabel htmlFor="targetDate">End Date</FormLabel>
                <Input
                  name="targetDate"
                  type="date"
                  {...register("targetDate")}
                  isInvalid={errors?.targetDate}
                  border="1px solid"
                  borderColor="progress_bg"
                  rounded="none"
                  boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
                />
                <FormHelperText>Campaign end date (mm-dd-yyyy)</FormHelperText>
                <Text fontSize="sm" color="color_alt">
                  {errors.targetDate?.message}
                </Text>
              </FormControl>
            </Flex>

            {/* terms and conditions */}
            <FormControl id="terms" mb="1.125rem">
              <Divider my="1.125rem" />
              <FormLabel htmlFor="terms" aria-hidden="true" visibility="hidden">
                Agree to site Terms and Conditions.
              </FormLabel>
              <Checkbox
                name="terms"
                type="date"
                {...register("terms")}
                isInvalid={errors?.terms}
              >
                I agree to the Terms and Condition.
              </Checkbox>
              <Text fontSize="sm" color="color_alt">
                {errors.terms?.message}
              </Text>
            </FormControl>

            <Flex direction="row" justifyContent="space-between">
              <Button
                onClick={() => router.push("/my-account")}
                my="1rem"
                type="button"
                colorScheme="red"
                size="lg"
              >
                Cancel
              </Button>

              <Button my="1rem" type="submit" colorScheme="blue" size="lg">
                Submit Project
              </Button>
            </Flex>
          </Flex>
        </Container>
        </Flex>
      </Layout>
    );
  }

  // no logged user, redirect
  return <Layout SEO={{ title: "Loading - VR Funds" }}>Loading...</Layout>;
}
