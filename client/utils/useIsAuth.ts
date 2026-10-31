import { useFetchMeQuery } from "generated/grahpql";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isServer } from "./isServer";

export const useIsAuth = () => {
  const router = useRouter();
  const { data, loading } = useFetchMeQuery({
    fetchPolicy: "network-only",
    skip: isServer(),
  });
  const isLoggedIn = loading || !!data?.me;

  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace("/auth?next=" + router.pathname);
    }
  }, [loading, data?.me, router]);

  return { isLoggedIn, user: data?.me };
};
