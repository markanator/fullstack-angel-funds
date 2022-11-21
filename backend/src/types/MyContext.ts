import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import {
  createUserLoader,
  createProjectLoader,
  ProjectRewardsLoader,
  donationsLoader,
} from "src/dataloaders";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId: number };
  };
  res: Response;
  redisClient: Redis;
  prisma: PrismaClient;
  userLoader: ReturnType<typeof createUserLoader>;
  projectLoader: ReturnType<typeof createProjectLoader>;
  projectRewardsLoader: ReturnType<typeof ProjectRewardsLoader>;
  donationsLoader: ReturnType<typeof donationsLoader>;
};
