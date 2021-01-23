import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFetchMeQuery } from "generated/grahpql";

export const useIsAuth = () => {
  const { data, loading } = useFetchMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [loading, data, router]);
};
