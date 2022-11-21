import AuthBanner from "@/components/authShared/AuthBanner";
import Layout from "@/components/Layout";
import AddEditProjectForm from "@/components/myAccountShared/AddEditProjectForm";
import {
  GetAuthoredProjectByIdDocument,
  useCreateProjectMutation,
  useUpdateAuthoredProjectMutation,
} from "@/generated/grahpql";
import { IProjectDetails } from "@/types/IProjectDetails";
import { initializeApollo } from "@/utils/apolloClient";
import { useIsAuth } from "@/utils/useIsAuth";
import { useToast, Container, Text } from "@chakra-ui/react";
import { IProjectForm } from "Forms/Schema/createProjectSchema";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

const EditProjectPage = ({
  project,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { isLoggedIn } = useIsAuth(); //logged in user
  const router = useRouter(); // for nav
  const { id } = router.query;
  const [updateProject] = useUpdateAuthoredProjectMutation();

  const toast = useToast();

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
      <AuthBanner bgImage="/images/breadcrumb.png" title="Edit a Project" />
      <Container maxW="6xl" py="5rem">
        {!isLoggedIn ? (
          <Text>Loading...</Text>
        ) : (
          <AddEditProjectForm
            handleProjectSubmit={onSubmit}
            initialValues={project as any}
          />
        )}
      </Container>
    </Layout>
  );
};

export async function getServerSideProps({
  res,
  query,
}: GetServerSidePropsContext) {
  const projectId = query.id;

  const apolloClient = initializeApollo();
  const { data }: { data: IProjectDetails } = await apolloClient.query({
    query: GetAuthoredProjectByIdDocument,
    variables: {
      getAuthoredProjectByIdId: +(projectId as string),
    },
    fetchPolicy: "network-only",
  });

  console.log("### GQL RES:: ", data?.getProjectBySlug?.id);

  if (!data?.getProjectBySlug?.id) {
    res.writeHead(307, {
      Location: "/404",
    });

    res.end();
    return { props: { project: null } };
  }

  return {
    props: {
      project: data?.getProjectBySlug,
    },
  };
}

export default EditProjectPage;
