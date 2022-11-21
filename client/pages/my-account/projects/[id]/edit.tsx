import AuthBanner from "@/components/authShared/AuthBanner";
import Layout from "@/components/Layout";
import AddEditProjectForm from "@/components/myAccountShared/AddEditProjectForm";
import {
  GetAuthoredProjectByIdDocument,
  useCreateProjectMutation,
  useGetAuthoredProjectByIdQuery,
  useUpdateAuthoredProjectMutation,
} from "@/generated/grahpql";
import { IProjectDetails } from "@/types/IProjectDetails";
import { initializeApollo } from "@/utils/apolloClient";
import { useIsAuth } from "@/utils/useIsAuth";
import { useToast, Container, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { IProjectForm } from "Forms/Schema/createProjectSchema";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

type Props = {};

const EditProjectPage = () => {
  const { isLoggedIn } = useIsAuth(); //logged in user
  const router = useRouter(); // for nav
  const { id } = router.query;
  const toast = useToast();

  const [updateProject] = useUpdateAuthoredProjectMutation();
  const { data, loading } = useGetAuthoredProjectByIdQuery({
    variables: {
      getAuthoredProjectByIdId: +(id as string), // value for 'getAuthoredProjectByIdId'
    },
  });

  const foundProjectToEdit = useMemo(() => {
    if (data?.getAuthoredProjectById?.project?.id) {
      const {
        category,
        description,
        fundTarget,
        image,
        publishDate,
        targetDate,
        title,
      } = data?.getAuthoredProjectById?.project;
      return {
        title,
        description,
        category,
        image: image ?? "",
        fundTarget: fundTarget.toString(),
        publishDate: dayjs(publishDate).format("YYYY-MM-DD"),
        targetDate: dayjs(targetDate).format("YYYY-MM-DD"),
        terms: true,
      };
    }
    return undefined;
  }, [data?.getAuthoredProjectById?.project]);

  const onSubmit = async (formData: IProjectForm) => {
    const { data, errors } = await updateProject({
      variables: {
        input: {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          image: formData.image,
          fundTarget: +formData.fundTarget,
          publishDate: formData.publishDate,
          targetDate: formData.targetDate,
        },
        updateProjectId: +(id as string),
      },
      update: (cache: any) => {
        cache.evict({ fieldName: "projects:{}" });
      },
    });

    if (!errors && data?.updateProject.project?.id) {
      toast({
        title: "Project created.",
        description: `Your Project: ${data.updateProject.project?.title}, was successfully updated.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push(`/project/${data?.updateProject.project?.slug}`);
    }
  };

  return (
    <Layout SEO={{ title: "Edit a Project - Angel Funds" }}>
      <AuthBanner
        bgImage="/images/breadcrumb.png"
        title={
          !foundProjectToEdit
            ? "Editing..."
            : `Editing: ${foundProjectToEdit.title}`
        }
      />
      <Container maxW="6xl" py="5rem">
        {!isLoggedIn || loading ? (
          <Text>Loading...</Text>
        ) : (
          <AddEditProjectForm
            handleProjectSubmit={onSubmit}
            initialValues={foundProjectToEdit}
          />
        )}
      </Container>
    </Layout>
  );
};

export default EditProjectPage;
