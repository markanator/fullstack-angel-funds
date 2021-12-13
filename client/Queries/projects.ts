import { getProjectBySlug } from "@/async/projects"
import { QueryKey, useQuery, UseQueryOptions } from "react-query"
import { foundProject } from "../types"


export const useFetchProjectQuery = (slug: string, options?: Omit<UseQueryOptions<foundProject, unknown, foundProject, QueryKey>, "queryKey" | "queryFn">) => {
  return useQuery<foundProject>(['project', slug], async () => {
    const project = await getProjectBySlug(slug)
    return project
  }, options)
}