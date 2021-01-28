import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import { createProjectLoader } from "../dataloaders/createProjectLoader";
import { createUserLoader } from "../dataloaders/createUserLoader";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId: number };
  };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  projectLoader: ReturnType<typeof createProjectLoader>;
};
