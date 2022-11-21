import BackerTablePanel from "@/components/projectDetailsComps/BackerTablePanel";
import DescriptionPanel from "@/components/projectDetailsComps/DescriptionPanel";
import TopHalfProjectDetails from "@/components/projectDetailsComps/TopHalfProjectDetails";
import {
  Container,
  Flex,
  Tab,
  TabList,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import AuthBanner from "components/authShared/AuthBanner";
import { GetbySlugDocument, GetbySlugQuery } from "generated/grahpql";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React from "react";
import { addApolloState, initializeApollo } from "utils/apolloClient";
import Layout from "../../components/Layout";

export default function ProjectDetails({
  project,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log({ project });
  return (
    <Layout
      SEO={{
        title: `${project?.title} - Angel Funds`,
        image: project?.image ?? "",
        description: project?.description.slice(0, 100),
        keywords: project?.category,
      }}
    >
      <AuthBanner bgImage={project?.image ?? ""} title={project!.title} />
      <article>
        {/* TOP HALF */}
        <TopHalfProjectDetails project={project as any} />
        {/* BOTTOM */}
        <Flex as="section" flexDirection="column" w="full" h="full" bg="white">
          <Tabs w="full" m="auto" variant="unstyled">
            <Container maxW="7xl" mx="auto" mt="-70px">
              <TabList bgColor="testimonial_bg">
                <CustomTab>Description</CustomTab>
                {/* <CustomTab>Updates</CustomTab> */}
                {project?.showContributors && <CustomTab>BackerList</CustomTab>}
              </TabList>
            </Container>
            <TabPanels>
              <DescriptionPanel description={project?.description ?? ""} />
              {/* TODO: project updates */}
              {project?.showContributors && (
                <BackerTablePanel
                  donations={project?.donations ?? []}
                  // showNames={project?.showContributorNames}
                />
              )}
            </TabPanels>
          </Tabs>
        </Flex>
      </article>
    </Layout>
  );
}

const CustomTab = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tab
      p="15px 60px"
      fontSize="20px"
      fontWeight="bold"
      mr={8}
      lineHeight="40px"
      bgColor="color_alt"
      color="white"
      _selected={{ color: "black", bg: "white" }}
    >
      {children}
    </Tab>
  );
};

export async function getServerSideProps({
  req,
  res,
  query,
}: GetServerSidePropsContext) {
  const apc = initializeApollo();
  const slug = query.slug;

  const { data }: { data: GetbySlugQuery } = await apc.query({
    query: GetbySlugDocument,
    variables: {
      slug,
    },
  });

  console.log("project slug::", slug);

  if (!data?.getProjectBySlug) {
    res.writeHead(307, {
      Location: "/404",
    });

    res.end();
    return { props: { project: undefined } };
  }
  const shallowCopy = { ...(data?.getProjectBySlug ?? {}) };

  if (shallowCopy?.donations?.length && !shallowCopy?.showContributorNames) {
    shallowCopy?.donations.forEach((d) => ({
      ...d,
      donor: {
        ...d.donor,
        fullName: "Anonymous Ssr",
      },
    }));
  }

  return addApolloState(apc, {
    props: {
      project: shallowCopy as GetbySlugQuery["getProjectBySlug"],
    },
  });
}
