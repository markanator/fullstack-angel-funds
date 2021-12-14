// Credit: @leerob
// URL: https://github.com/leerob/mastering-nextjs-old-site

import Head from "next/head";
import { withRouter } from "next/router";
import React from "react";
import format from "date-fns/format";
import Title from "title";

const dateTime = (date) => new Date(date).toISOString();
const fullDate = (date) => format(date, "MMMM D, YYYY");

interface ISeoProps {
  date?: string;
  description?: string;
  image?: string;
  title?: string;
  keywords?: string;
  router?: any;
}

const Page = ({
  date,
  description = "",
  image,
  title = "VR Funds",
  keywords,
  router,
}: ISeoProps) => {
  const domain = "https://fullstack-vrfunds.vercel.app/";
  const formattedTitle = (Title(title) as unknown) as string;
  const url = router && router.asPath ? router.asPath : undefined;
  const canonical = url && url === "/" ? domain : domain + url;
  // const featuredImage = domain + image;

  return (
    <>
      <Head>
        <title>{formattedTitle}</title>
        <meta charSet="utf-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        {description && <meta content={description} name="description" />}
        {keywords && <meta content={keywords} name="keywords" />}
        <meta content="follow, index" name="robots" />
        <meta content="#ffffff" name="theme-color" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <meta
          content="/favicons/browserconfig.xml"
          name="msapplication-config"
        />
        <link
          href="/favicons/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicons/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicons/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/favicons/site.webmanifest" rel="manifest" />
        <link
          color="#5bbad5"
          href="/favicons/safari-pinned-tab.svg"
          rel="mask-icon"
        />
        <link href="/favicons/favicon.ico" rel="shortcut icon" />

        {url && <link href={canonical} rel="canonical" />}

        <meta content="en_US" property="og:locale" />
        <meta content={formattedTitle} property="og:title" />
        <meta content={description} property="og:description" />
        <meta content={canonical} property="og:url" />

        {image && (
          <>
            <meta content={image} property="og:image" />
            <meta content={description} property="og:image:alt" />
          </>
        )}
        {date && (
          <>
            <meta content="article" property="og:type" />
            <meta content={dateTime(date)} property="article:published_time" />
          </>
        )}
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="@_mark_ambro" name="twitter:site" />
        <meta content="@_mark_ambro" name="twitter:creator" />
      </Head>
    </>
  );
};

export default withRouter(Page);
