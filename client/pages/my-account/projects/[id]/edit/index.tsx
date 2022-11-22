import AuthBanner from "@/components/authShared/AuthBanner";
import CustomTab from "@/components/common/CustomTab";
import Layout from "@/components/Layout";
import AddEditProjectForm from "@/components/myAccountShared/AddEditProjectForm";
import AddEditProjectRewards from "@/components/myAccountShared/AddEditRewards";
import {
  useGetAuthoredProjectByIdQuery,
  useUpdateAuthoredProjectMutation,
} from "@/generated/grahpql";
import { useIsAuth } from "@/utils/useIsAuth";
import {
  Container,
  Flex,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { IProjectForm } from "Forms/Schema/createProjectSchema";
import { useRouter } from "next/router";
import { useMemo } from "react";

type Props = {};

const EditProjectPage = () => {
  const { isLoggedIn } = useIsAuth();
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();

  const [updateProject] = useUpdateAuthoredProjectMutation();
  const { data, loading } = useGetAuthoredProjectByIdQuery({
    variables: {
      getAuthoredProjectByIdId: +(id as string),
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

  const onUpdateProject = async (formData: IProjectForm) => {
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
        extraBottomSpace
        title={
          !foundProjectToEdit
            ? "Editing..."
            : `Editing: ${foundProjectToEdit.title}`
        }
      />
      {!isLoggedIn || loading ? (
        <Text>Loading...</Text>
      ) : (
        <Flex w="full" bgColor="testimonial_bg" zIndex={10}>
          <Container maxW="6xl" zIndex={10}>
            <Tabs size="lg" variant="unstyled" zIndex={10}>
              <TabList mt="-70px" zIndex={10}>
                <CustomTab selectedColor="testimonial_bg">
                  Project Details
                </CustomTab>
                <CustomTab selectedColor="testimonial_bg">Rewards</CustomTab>
              </TabList>
              <TabPanels>
                <TabPanel pt="5rem" pb="8rem">
                  <AddEditProjectForm
                    handleProjectSubmit={onUpdateProject}
                    initialValues={foundProjectToEdit}
                  />
                </TabPanel>
                <TabPanel pt="5rem" pb="8rem">
                  <AddEditProjectRewards
                    existingRewards={
                      data?.getAuthoredProjectById?.project?.rewards ?? []
                    }
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Container>
        </Flex>
        // TODO: 1. add tabs
        // TODO: 2. create addRewards Form on the 2nd panel
        // TODO: 3. create addRewards gql mutation
      )}
    </Layout>
  );
};

export default EditProjectPage;
