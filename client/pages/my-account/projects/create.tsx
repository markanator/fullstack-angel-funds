import AddEditProjectForm from "@/components/myAccountShared/AddEditProjectForm";
import { Container, Text, useToast } from "@chakra-ui/react";
import { IProjectForm } from "Forms/Schema/createProjectSchema";
import { useRouter } from "next/router";
import { useIsAuth } from "utils/useIsAuth";
import AuthBanner from "../../../components/authShared/AuthBanner";
import Layout from "../../../components/Layout";
import { useCreateProjectMutation } from "../../../generated/grahpql";

export default function CreateProjectPage() {
  const { isLoggedIn } = useIsAuth(); //logged in user
  const router = useRouter(); // for nav
  const [createProject, { loading }] = useCreateProjectMutation();

  const toast = useToast();

  const onSubmit = async (formData: IProjectForm) => {
    const project = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      image: formData.image,
      fundTarget: +formData.fundTarget.replace(/(\$|,|\.)/g, ""),
      publishDate: formData.publishDate,
      targetDate: formData.targetDate,
      currentFunds: 0,
    };
    const { data, errors } = await createProject({
      variables: {
        input: project,
      },
      update: (cache: any) => {
        cache.evict({ fieldName: "projects:{}" });
      },
    });

    if (!errors) {
      if (data?.createProject?.id) {
        toast({
          title: "Project created.",
          description: `Your Project: ${data.createProject?.title}, was successfully created.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.push(`/project/${data?.createProject?.slug}`);
      }
    }
  };

  return (
    <Layout SEO={{ title: "Add a Project - Angel Funds" }}>
      <AuthBanner bgImage="/images/breadcrumb.png" title="Add a Project" />
      <Container maxW="6xl" py="5rem">
        {!isLoggedIn ? (
          <Text>Loading...</Text>
        ) : (
          <AddEditProjectForm handleProjectSubmit={onSubmit} />
        )}
      </Container>
    </Layout>
  );
}
