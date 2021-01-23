import {
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
//
import AuthBanner from "../../components/authShared/AuthBanner";
import Layout from "../../components/Layout";

interface IAddProjectPage {}

export default function AddProjectPage({}: IAddProjectPage) {
  const { register, handleSubmit, errors, formState } = useForm();
  const router = useRouter();

  const onSubmit = (data: any) => alert(JSON.stringify(data, null, 2));

  // console.log("add project props", user);
  return (
    <Layout SEO={{ title: "Add a Project - VR Funds" }}>
      <AuthBanner
        bgImage="https://gaviaspreview.com/wp/krowd/wp-content/uploads/2015/12/breadcrumb.jpg"
        title="Add a Project"
      />
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
          {/* TITLE */}
          <FormControl mb="1.125rem">
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              name="title"
              ref={register}
              border="1px solid"
              borderColor="progress_bg"
              rounded="none"
              boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
            />
            <FormHelperText>Put the campaign title here</FormHelperText>
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>

          {/* Description */}
          <FormControl mb="1.125rem">
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              name="description"
              ref={register}
              row="6"
              col="6"
              // type='textarea'
              border="1px solid"
              borderColor="progress_bg"
              rounded="none"
              boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
            />
            <FormHelperText>Put the campaign description here</FormHelperText>
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>

          {/* Category */}
          <FormControl mb="1.125rem">
            <FormLabel htmlFor="category">Category</FormLabel>
            <Select placeholder="Select option">
              <option value="Design">Design</option>
              <option value="Education">Education</option>
              <option value="Fashion">Fashion</option>
              <option value="Fine_Arts">Fine Arts</option>
              <option value="Medical">Medical</option>
              <option value="Technology">Technology</option>
            </Select>
            <FormHelperText>Select your campaign category</FormHelperText>
            <FormErrorMessage>
              {errors.category && errors.category.message}
            </FormErrorMessage>
          </FormControl>

          {/* Image */}
          <FormControl mb="1.125rem">
            <FormLabel htmlFor="image">Feature Image</FormLabel>
            <Input
              name="image"
              ref={register}
              placeholder="https://..."
              border="1px solid"
              borderColor="progress_bg"
              rounded="none"
              boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
            />
            <FormHelperText>Upload a campaign feature image</FormHelperText>
            <FormErrorMessage>
              {errors.image && errors.image.message}
            </FormErrorMessage>
          </FormControl>

          <Flex direction="row">
            {/* fundTarget */}
            <FormControl mb="1.125rem" mr="1rem">
              <FormLabel htmlFor="currentFunds">Starting Amount</FormLabel>
              <Input
                name="currentFunds"
                type="number"
                ref={register}
                placeholder="0"
                border="1px solid"
                borderColor="progress_bg"
                rounded="none"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
              />
              <FormHelperText>Campaign funding goal</FormHelperText>
              <FormErrorMessage>
                {errors.currentFunds && errors.currentFunds.message}
              </FormErrorMessage>
            </FormControl>

            {/* fundTarget */}
            <FormControl mb="1.125rem" ml="1rem">
              <FormLabel htmlFor="fundTarget">Fund Target</FormLabel>
              <Input
                name="fundTarget"
                type="number"
                placeholder="0"
                ref={register}
                border="1px solid"
                borderColor="progress_bg"
                rounded="none"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
              />
              <FormHelperText>Campaign funding goal</FormHelperText>
              <FormErrorMessage>
                {errors.fundTarget && errors.fundTarget.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>

          <Flex direction="row">
            {/* publishDate */}
            <FormControl mb="1.125rem" mr="1rem">
              <FormLabel htmlFor="publishDate">Start Date</FormLabel>
              <Input
                name="publishDate"
                type="date"
                ref={register}
                border="1px solid"
                borderColor="progress_bg"
                rounded="none"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
              />
              <FormHelperText>Campaign start date (mm-dd-yyyy)</FormHelperText>
              <FormErrorMessage>
                {errors.publishDate && errors.publishDate.message}
              </FormErrorMessage>
            </FormControl>

            {/* targetDate */}
            <FormControl mb="1.125rem" ml="1rem">
              <FormLabel htmlFor="targetDate">End Date</FormLabel>
              <Input
                name="targetDate"
                type="date"
                ref={register}
                border="1px solid"
                borderColor="progress_bg"
                rounded="none"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
              />
              <FormHelperText>Campaign end date (mm-dd-yyyy)</FormHelperText>
              <FormErrorMessage>
                {errors.targetDate && errors.targetDate.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>

          {/* terms and conditions */}
          <FormControl mb="1.125rem">
            <Divider my="1.125rem" />
            <FormLabel htmlFor="terms" aria-hidden="true" visibility="hidden">
              Agree to site Terms and Conditions.
            </FormLabel>
            <Checkbox
              name="terms"
              type="date"
              ref={register({ required: true })}
            >
              I agree to the Terms and Condition.
            </Checkbox>
            <FormErrorMessage>
              {errors.terms && errors.terms.message}
            </FormErrorMessage>
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

            <Button
              my="1rem"
              type="submit"
              isloading={formState.isSubmitting}
              colorScheme="blue"
              size="lg"
            >
              Submit Project
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
}
