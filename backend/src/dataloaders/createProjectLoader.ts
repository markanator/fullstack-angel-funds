import DataLoader from "dataloader";
import { In } from "typeorm";
import { Project } from "../entity";

export const createProjectLoader = () =>
  new DataLoader<number, Project>(async (pIDs) => {
    // get all user in one query
    const projects = await Project.findBy({ id: In(pIDs as number[])});
    // need to return data
    const idToProject: Record<number, Project> = {};

    projects.forEach((p) => {
      idToProject[p.id] = p;
    });

    return pIDs.map((pID) => idToProject[pID]);
  });
