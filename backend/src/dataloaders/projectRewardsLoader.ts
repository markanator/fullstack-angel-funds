import { Reward } from "@prisma/client";
import DataLoader from "dataloader";
import { dbClient } from "../utils/prismaClient";

export const ProjectRewardsLoader = () =>
  new DataLoader<number, Reward[]>(async (entityIds) => {
    // get all user in one query
    const entities = await dbClient.reward.findMany({
      where: {
        projectId: entityIds[0],
      },
    });

    // need to return data
    const projectIdToRewardMap: Record<number, Reward[]> = {};

    entities?.forEach((entity) => {
      projectIdToRewardMap[entity.projectId] = [
        ...(projectIdToRewardMap[entity.projectId] ?? []),
        entity,
      ];
    });

    const rewArr = entityIds.map((entityId) => projectIdToRewardMap[entityId]);

    return rewArr;
  });
