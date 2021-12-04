import { getLoggedInSession } from '@/async/auth';
import { getAllProjects } from '@/async/projects';
import { useQuery } from 'react-query';


export default function useFetchAllProjects(params?: Record<string, any>, ownerId?: number) {
  return useQuery('exploreProjects', () => getAllProjects(params), {
    enabled: ownerId && ownerId
  });
}
