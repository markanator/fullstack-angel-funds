import "reflect-metadata";
import { config } from "dotenv";
config();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express from "express";
import session from "express-session";
const RedisStore = require("connect-redis")(session);
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
// locals
import {
  DonationResolver,
  HelloResolver,
  ProjectResolver,
  RewardsResolver,
  UserResolver,
} from "./resolvers";
import {
  createUserLoader,
  createProjectLoader,
  ProjectRewardsLoader,
  donationsLoader,
} from "./dataloaders";
import { CORS_OPTIONS, SESSION_CONFIG } from "./utils/constants";
import { dbClient } from "./utils/prismaClient";
import type { MyContext } from "./types/MyContext";

const PORT = process.env.PORT || 7777;

const main = async () => {
  // init app
  const app = express();
  // redis
  const redisClient = new Redis({
    port: Number(process.env.REDIS_PORT!),
    host: process.env.REDIS_HOST,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  });

  app.set("trust proxy", 1);

  // session middleware before Apollo
  app.use(session(SESSION_CONFIG(new RedisStore({ client: redisClient, disableTouch: true }))));

  const apolloServer = new ApolloServer<MyContext>({
    schema: await buildSchema({
      resolvers: [HelloResolver, ProjectResolver, UserResolver, DonationResolver, RewardsResolver],
      validate: false,
    }),
    introspection: true,
  });

  await apolloServer.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(CORS_OPTIONS),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }): Promise<MyContext> => ({
        req: req as MyContext["req"],
        res,
        redisClient,
        prisma: dbClient,
        userLoader: createUserLoader(),
        projectLoader: createProjectLoader(),
        projectRewardsLoader: ProjectRewardsLoader(),
        donationsLoader: donationsLoader(),
      }),
    }),
  );

  app.listen(PORT, () => console.log(`### server started on http://localhost:${PORT}/graphql`));
};

// catch error
main().catch((err) => console.error(err));
