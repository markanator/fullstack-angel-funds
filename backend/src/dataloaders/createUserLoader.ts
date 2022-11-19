import { User } from "@prisma/client";
import DataLoader from "dataloader";
import { dbClient } from "../utils/prismaClient";

export const createUserLoader = () =>
  new DataLoader<number, User>(async (userIds) => {
    // get all user in one query
    const users = await dbClient.user.findMany({
      where: {
        id: {
          in: userIds as number[]
        }
      }
    });
    // need to return data
    const userIdToUser: Record<number, User> = {};

    users?.forEach((user) => {
      userIdToUser[user.id] = user;
    });

    return userIds.map((userId) => userIdToUser[userId]);
  });
