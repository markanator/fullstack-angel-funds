import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
  domain: process.env.AUTH0_DOMAIN as string,
  clientId: process.env.AUTH0_CLIENT_ID as string,
  clientSecret: process.env.AUTH0_SECRET,
  scope: "openid profile",
  redirectUri: "http://localhost:3000/api/auth/callback",
  postLogoutRedirectUri: "http://localhost:3000/",
  session: {
    cookieSecret: process.env.COOKIE_SECRET as string,
    cookieLifetime: 7200,
    storeRefreshToken: false,
  },
  oidcClient: {
    httpTimeout: 2500,
    clockTolerance: 10000,
  },
});
