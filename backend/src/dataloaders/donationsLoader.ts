import { Donation } from "@prisma/client";
import DataLoader from "dataloader";
import { dbClient } from "../utils/prismaClient";

export const donationsLoader = () =>
  new DataLoader<number, Donation[]>(async (entityIds) => {
    // get all user in one query
    const entities = await dbClient.donation.findMany({
      where: {
        projectId: {
          in: entityIds as number[],
        },
      },
    });

    // need to return data
    const projectIdToEntityMap: Record<number, Donation[]> = {};

    entities?.forEach((entity) => {
      projectIdToEntityMap[entity.projectId] = [
        ...(projectIdToEntityMap[entity.projectId] ?? []),
        entity,
      ];
    });

    const donoArr =
      entityIds.map((entityId) => projectIdToEntityMap[entityId]) ?? [];
    return donoArr;
  });
