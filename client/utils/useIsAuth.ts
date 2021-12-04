import { getLoggedInSession } from "@/async/auth";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useIsAuth = () => {
  const router = useRouter();
  const {isLoading, data: authUserData} = useQuery('authUser', getLoggedInSession);
  const [checksOut, setChecksOut] = useState(false);

  useEffect(() => {
    if (!isLoading && !authUserData) {
      setChecksOut(false);
      router.replace("/auth?next=" + router.pathname);
    } else {
      setChecksOut(true);
    }
  }, [isLoading, authUserData, router]);

  return { checksOut };
};
