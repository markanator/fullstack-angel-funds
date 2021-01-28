import DataLoader from "dataloader";
import { Project } from "../entity";

export const createProjectLoader = () =>
  new DataLoader<number, Project>(async (pIDs) => {
    // get all user in one query
    const projects = await Project.findByIds(pIDs as any[]);
    // need to return data
    const idToProject: Record<number, Project> = {};

    projects.forEach((p) => {
      idToProject[p.id] = p;
    });

    return pIDs.map((pID) => idToProject[pID]);
  });
