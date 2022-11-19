import "reflect-metadata";
import { config } from "dotenv";
config();
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import session from "express-session";
const RedisStore = require("connect-redis")(session);
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
// locals
import { createUserLoader } from "./dataloaders";
import { createProjectLoader } from "./dataloaders/createProjectLoader";
import {
  DonationResolver,
  HelloResolver,
  ProjectResolver,
  UserResolver,
} from "./resolvers";
import { COOKIE_NAME, __prod__ } from "./utils/constants";
import { dbClient } from "./utils/prismaClient";

const PORT = process.env.PORT || 7777;
const whitelist = ["*", process.env.CORS_ORIGIN!, process.env.CORS_STUDIO!];

const main = async () => {
  // init app
  const app = express();
  // redis
  const redisClient = new Redis(
    Number(process.env.REDIS_PORT!),
    process.env.REDIS_URL!
  );

  app.set("trust proxy", 1);

  // cors
  app.use(
    cors({
      origin: whitelist,
      credentials: true,
    })
  );

  // session middleware before Apollo
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 1, // 1 yrs
        httpOnly: __prod__,
        sameSite: "lax", // csrf protections
        secure: __prod__, //cookie only works in https
      },
      saveUninitialized: false, // create sesh by default regardless of !data
      secret: process.env.SESSION_SECRET as string,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        ProjectResolver,
        UserResolver,
        DonationResolver,
      ],
      validate: false,
    }),
    // deconstruct access
    context: ({ req, res }: any) => ({
      req,
      res,
      redisClient,
      prisma: dbClient,
      userLoader: createUserLoader(),
      projectLoader: createProjectLoader(),
    }),
    introspection: true,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: whitelist,
    },
  });

  app.listen(PORT, () =>
    console.log(`### server started on http://localhost:${PORT}/graphql`)
  );
};

// catch error
main().catch((err) => console.error(err));
