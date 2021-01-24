import { ApolloCache, useApolloClient } from "@apollo/client";
import { FetchMeDocument, useFetchMeQuery } from "generated/grahpql";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IChachedMe extends ApolloCache<object> {
  me: {
    avatarUrl: string;
    email: string;
    fullName: string;
    id: number;
    __typename: string;
  };
}

export const useIsAuth = () => {
  const router = useRouter();
  const { data, loading } = useFetchMeQuery();
  const [checksOut, setChecksOut] = useState(false);

  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace("/auth?next=" + router.pathname);
    } else {
      setChecksOut(true);
    }
  }, [loading, data, router]);

  return { checksOut };
};

// export const cacheLogCheck = () => {
//   const router = useRouter();
//   const apc = useApolloClient();

//   const { me }: IChachedMe = apc.cache.read({
//     query: FetchMeDocument,
//     optimistic: true,
//   });
//   const test = apc.readQuery({
//     query: FetchMeDocument,
//   });

//   if (!!test?.me) {
//     router.replace("/auth?next=" + router.pathname);
//   }

//   console.log("check cache for user:??", test);
// };
