import Banner from "@/components/authShared/AuthBanner";
import {
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
  Container,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "@/components/Layout";
import * as yup from "yup";

interface IHomeProps {}

interface IContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSchema = yup.object().shape({
  name: yup.string().min(2, "Too short.").required("Required."),
  email: yup.string().email().required("Required."),
  subject: yup.string(),
  message: yup.string(),
});

export default function contact({}: IHomeProps) {
  const toast = useToast();
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(ContactSchema),
  });

  const onSubmit = (formData: IContactFormData) => {
    alert(JSON.stringify(formData, null, 2));
    // setSentStatus("Hooray, message sent!");
    toast({
      title: "Message Sent successfully!",
      description:
        "Thank you for the message. We'll get back to you as soon as we can!",
      status: "success",
      isClosable: true,
      position: "bottom",
      duration: 9000,
    });
  };
  return (
    <Layout SEO={{ title: "Contact Us - VR Funds" }}>
      <Banner title="Contact" />
      <Container maxW="7xl" py="8rem">
        <Flex>
          {/* LEFT TEXT */}
          <Flex direction="column" w="40%" pr="2rem">
            <Heading fontSize="5xl" textColor="text_primary" as="h3" mb="3rem">
              Write Us a<br /> Message
            </Heading>
            <Text textColor="text_secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a
              tortor turpis. Pellentesque in arcu id augue tempus imperdiet ac
              sed metus. Praesent pellentesque nunc sed malesuada placerat.
              Integer gravida facilisis fringilla.
            </Text>
          </Flex>
          {/* RIGHT FORM */}
          <Flex flexDirection="column" w="60%">
            <Flex
              as="form"
              flexDirection="column"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Flex direction="row" w="full" mb="2rem">
                {/* FULL NAME */}
                <FormControl id="name" isRequired mr="1rem">
                  <Input
                    name="name"
                    type="text"
                    ref={register}
                    isInvalid={errors?.name}
                    placeholder="Your Name"
                    border="1px solid"
                    borderColor="progress_bg"
                    rounded="none"
                    boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
                    _placeholder={{
                      color: "text_secondary",
                    }}
                  />
                </FormControl>
                {/* EMAIL */}
                <FormControl id="email" isRequired ml="1rem">
                  <Input
                    name="email"
                    type="email"
                    ref={register}
                    isInvalid={errors?.email}
                    placeholder="Your Email"
                    border="1px solid"
                    borderColor="progress_bg"
                    rounded="none"
                    boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
                    _placeholder={{
                      color: "text_secondary",
                    }}
                  />
                </FormControl>
              </Flex>
              {/* SUBJECT */}
              <FormControl id="subject" mb="2rem">
                <Input
                  name="subject"
                  type="text"
                  ref={register}
                  isInvalid={errors?.subject}
                  placeholder="Your Subject"
                  border="1px solid"
                  borderColor="progress_bg"
                  rounded="none"
                  boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
                  _placeholder={{
                    color: "text_secondary",
                  }}
                />
              </FormControl>
              {/* Message */}
              <FormControl id="message" mb="1.5rem">
                <Textarea
                  name="message"
                  ref={register}
                  isInvalid={errors?.message}
                  placeholder="Your Message"
                  row="8"
                  col="8"
                  border="1px solid"
                  borderColor="progress_bg"
                  rounded="none"
                  boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.02) inset"
                  _placeholder={{
                    color: "text_secondary",
                  }}
                />
              </FormControl>
              {/* SUBMIT */}
              <Flex flexDir="row">
                <Button
                  type="submit"
                  size="lg"
                  rounded="0px"
                  bgColor="color_alt"
                  color="text_primary"
                >
                  Send Message
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Container>
      {/* THREE SECTIONS */}
      <Flex flexDir="row">
        <Flex
          w="33%"
          bgColor="color_icon"
          direction="column"
          px="2.5rem"
          py="4rem"
        >
          <Heading mb=".5rem" fontSize="2xl">
            About Us
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a
            tortor turpis.
          </Text>
        </Flex>
        <Flex
          w="33%"
          bgColor="color_primary"
          textColor="white"
          direction="column"
          px="2.5rem"
          py="4rem"
        >
          <Heading mb=".5rem" fontSize="2xl">
            Address
          </Heading>
          <Text>
            123 E. Main St. <br />
            Chicago, IL 60626 <br />
            USA
          </Text>
        </Flex>
        <Flex
          w="33%"
          bgColor="color_alt"
          direction="column"
          px="2.5rem"
          py="4rem"
        >
          <Heading mb=".5rem" fontSize="2xl">
            Online Addesses
          </Heading>
          <Text>
            contact@vrfunds.com <br />
            (123) 456-7890 <br />
          </Text>
        </Flex>
      </Flex>
    </Layout>
  );
}
