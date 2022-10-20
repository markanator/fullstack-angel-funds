import DataLoader from "dataloader";
import { In } from "typeorm";
import { User } from "../entity/User";

export const createUserLoader = () =>
  new DataLoader<number, User>(async (userIds) => {
    // get all user in one query
    const users = await User.findBy({ id: In(userIds as number[]) });
    // need to return data
    const userIdToUser: Record<number, User> = {};

    users.forEach((user) => {
      userIdToUser[user.id] = user;
    });

    return userIds.map((userId) => userIdToUser[userId]);
  });
