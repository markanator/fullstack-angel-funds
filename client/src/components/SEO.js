import React from 'react';
import { Helmet } from 'react-helmet';
import { useRouteMatch } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function SEO({ children, location, title, image }) {
  const { url } = useRouteMatch();
  const description = 'This is the site description';
  // change this later
  const site = 'https://markambrocio.com';
  return (
    <Helmet>
      <html lang="en" />
      <meta charSet="UTF-8" />
      <title>{`${title} | VR Funding` || 'VR Funding'}</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
      {/* meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta name="description" content={description} />
      {/* OPEN GRAPH */}
      {/* eslint-disable-next-line react/prop-types */}
      <link rel="canonical" href="http://mysite.com/example" />
      <meta property="og:url" content={site + url} />
      <meta property="og:image" content={image || '/logo.svg'} />
      <meta property="og:title" content={title} key="oftitle" />
      <meta property="og:site_name" content={title} key="ogsitename" />
      <meta property="og:description" content={description} key="ogdesc" />
      {children}
    </Helmet>
  );
}
