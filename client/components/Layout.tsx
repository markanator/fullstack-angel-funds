import { Box } from "@chakra-ui/react";
import React from "react";
import Page from "./Page";
import { Footer } from "./sharedNav/Footer";
import Navbar from "./sharedNav/NavBar";
// import Wrapper from './Wrapper';

interface ILayoutProps {
  children?: React.ReactNode;
  SEO?: {
    date?: string;
    description?: string;
    image?: string;
    title?: string;
    keywords?: string;
  };
}

export default function Layout({ children, SEO }: ILayoutProps) {
  return (
    <Box bgColor="white" textColor="text_primary">
      <Page {...SEO} />
      {/* Header */}
      <Navbar />
      <main>{children}</main>
      {/* FOOTER */}
      <Footer />
    </Box>
  );
}
