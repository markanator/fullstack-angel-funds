import { ApolloCache, useApolloClient } from "@apollo/client";
import { FetchMeDocument, useFetchMeQuery } from "generated/grahpql";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isServer } from "./isServer";

export const useIsAuth = () => {
  const router = useRouter();
  const { data, loading } = useFetchMeQuery({
    fetchPolicy: "network-only",
    skip: isServer(),
  });
  const [isLoggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace("/auth?next=" + router.pathname);
    } else {
      setIsloggedIn(true);
    }
  }, [loading, data?.me, router]);

  return { isLoggedIn, user: data?.me };
};
