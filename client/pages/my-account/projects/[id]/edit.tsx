import AuthBanner from "@/components/authShared/AuthBanner";
import CustomTab from "@/components/common/CustomTab";
import Layout from "@/components/Layout";
import AddEditProjectForm from "@/components/myAccountShared/AddEditProjectForm";
import AddEditProjectRewards from "@/components/myAccountShared/AddEditRewards";
import { ICreateRewardFormData } from "@/components/myAccountShared/rewards.utils";
import {
  useCreateProjectMutation,
  useCreateRewardMutation,
  useGetAuthoredProjectByIdQuery,
  useUpdateAuthoredProjectMutation,
  useUpdateRewardMutation,
} from "@/generated/grahpql";
import { formatAmountForDisplay } from "@/utils/stripe-helpers";
import { useIsAuth } from "@/utils/useIsAuth";
import { Container, Flex, Tabs, Text } from "@chakra-ui/react";
import { toaster } from "@/utils/toaster";
import dayjs from "dayjs";
import { IProjectForm } from "Forms/Schema/createProjectSchema";
import { useRouter } from "next/router";
import { useMemo } from "react";

type Props = {};

const EditProjectPage = () => {
  const { isLoggedIn } = useIsAuth();
  const router = useRouter();
  const { id } = router.query;
  const [updateProject] = useUpdateAuthoredProjectMutation();
  const [createReward] = useCreateRewardMutation();
  const [updateReward] = useUpdateRewardMutation();

  const { data, loading } = useGetAuthoredProjectByIdQuery({
    variables: {
      getAuthoredProjectByIdId: +(id as string),
    },
    fetchPolicy: "network-only",
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
        fundTarget: formatAmountForDisplay(fundTarget),
        publishDate: dayjs(publishDate).format("YYYY-MM-DD"),
        targetDate: dayjs(targetDate).format("YYYY-MM-DD"),
        terms: true,
      };
    }
    return undefined;
  }, [data?.getAuthoredProjectById?.project]);

  const onUpdateProject = async (formData: IProjectForm) => {
    const formatedData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      image: formData.image,
      fundTarget: +formData.fundTarget.replace(/(\$|,|\.)/g, ""),
      publishDate: formData.publishDate,
      targetDate: formData.targetDate,
    };
    console.log({ formatedData });
    const { data, error } = await updateProject({
      variables: {
        input: formatedData,
        updateProjectId: +(id as string),
      },
      update: (cache: any) => {
        cache.evict({ fieldName: "projects:{}" });
      },
    });

    if (!error && data?.updateProject.project?.id) {
      toaster.create({
        title: "Project created.",
        description: `Your Project: ${data.updateProject.project?.title}, was successfully updated.`,
        type: "success",
        duration: 9000,
        closable: true,
      });
      router.push(`/project/${data?.updateProject.project?.slug}`);
    }
  };

  const onCreateReward = async (createFormData: ICreateRewardFormData) => {
    console.log({ createFormData });
    if (!data?.getAuthoredProjectById?.project?.id) {
      return;
    }
    const { data: createRewardData, error: createRewardError } =
      await createReward({
        variables: {
          input: {
            title: createFormData.title,
            description: createFormData.description,
            image: createFormData.image,
            amount: +createFormData.amount.replace("$", "").replace(".", ""),
            deliveredByMonth: createFormData.deliveredByMonth,
            deliveredByYear: createFormData.deliveredByYear,
            projectId: data?.getAuthoredProjectById?.project?.id,
            quantityRemaining: +createFormData.quantityRemaining,
          },
        },
        update: (cache) => {
          cache.evict({ fieldName: "Projects:{}" });
        },
      });

    if (
      !createRewardError &&
      createRewardData?.createProjectReward?.reward?.id
    ) {
      toaster.create({
        title: "Project created.",
        description: `Your Project: ${data.getAuthoredProjectById?.project?.title}, was successfully updated.`,
        type: "success",
        duration: 9000,
        closable: true,
      });
    }
  };
  const onUpdateReward = async (
    updateRewardFormData: ICreateRewardFormData
  ) => {
    console.log({ updateRewardFormData });
    const rewardId = data?.getAuthoredProjectById?.project?.rewards?.[0]?.id;
    if (!rewardId) {
      return;
    }
    const { data: updateRewardData, error: updateRewardError } =
      await updateReward({
        variables: {
          input: {
            rewardId,
            title: updateRewardFormData.title,
            description: updateRewardFormData.description,
            image: updateRewardFormData.image,
            deliveredByMonth: updateRewardFormData.deliveredByMonth,
            deliveredByYear: updateRewardFormData.deliveredByYear,
            quantityRemaining: +updateRewardFormData.quantityRemaining,
          },
        },
        update: (cache) => {
          cache.evict({ fieldName: "Projects:{}" });
        },
      });

    if (
      !updateRewardError &&
      updateRewardData?.updateProjectReward?.reward?.id
    ) {
      toaster.create({
        title: "Project created.",
        description: `Your Reward was successfully updated.`,
        type: "success",
        // duration: 9000,
        closable: true,
      });
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
            <Tabs.Root
              defaultValue="details"
              size="lg"
              variant="plain"
              zIndex={10}
            >
              <Tabs.List mt="-70px" zIndex={10}>
                <CustomTab value="details" selectedColor="testimonial_bg">
                  Project Details
                </CustomTab>
                <CustomTab value="rewards" selectedColor="testimonial_bg">
                  Rewards
                </CustomTab>
              </Tabs.List>
              <Tabs.Content value="details" pt="5rem" pb="8rem">
                <AddEditProjectForm
                  handleProjectSubmit={onUpdateProject}
                  initialValues={foundProjectToEdit}
                />
              </Tabs.Content>
              <Tabs.Content value="rewards" pt="5rem" pb="8rem">
                <AddEditProjectRewards
                  onCreateReward={onCreateReward}
                  onUpdateReward={onUpdateReward}
                  existingRewards={
                    data?.getAuthoredProjectById?.project?.rewards ?? []
                  }
                />
              </Tabs.Content>
            </Tabs.Root>
          </Container>
        </Flex>
      )}
    </Layout>
  );
};

export default EditProjectPage;
