import { Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Project } from "../entity/Project";

@Resolver(Project)
export class ProjectResolver {
  @Query(() => [Project])
  async projects() {
    const projects = await getConnection()
      .createQueryBuilder()
      .select("*")
      .from(Project, "project")
      .getMany();

    return projects;
  }
}
