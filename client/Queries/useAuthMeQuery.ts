import { getLoggedInSession } from '@/async/auth';
import { useQuery } from 'react-query';


export default function useAuthMeQuery() {
  return useQuery('authUser', getLoggedInSession, {
    retry: false
  });
}
