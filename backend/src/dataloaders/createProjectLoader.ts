import { Project } from "@prisma/client";
import DataLoader from "dataloader";
import { dbClient } from "../utils/prismaClient";

export const createProjectLoader = () =>
  new DataLoader<number, Project>(async (pIDs) => {
    // get all user in one query
    const projects = await dbClient.project.findMany({
      where: {
        id: {
          in: pIDs as number[]
        }
      }
    });
    // need to return data
    const idToProject: Record<number, Project> = {};

    projects?.forEach((p) => {
      idToProject[p.id] = p;
    });

    return pIDs.map((pID) => idToProject[pID]);
  });
