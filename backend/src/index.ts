import "reflect-metadata";
import { config } from "dotenv";
config();
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import session from "express-session";
const RedisStore = require("connect-redis")(session)
import Redis from "ioredis";
import path from "path";
import { buildSchema } from "type-graphql";
// locals
import { DataSource } from "typeorm";
import { createUserLoader } from "./dataloaders";
import { createProjectLoader } from "./dataloaders/createProjectLoader";
import { Donation, Project, Upvote, User } from "./entity";
import {
  DonationResolver,
  HelloResolver,
  ProjectResolver,
  UserResolver,
} from "./resolvers";
import { COOKIE_NAME, __prod__ } from "./utils/constants";

const PORT = process.env.PORT || 7777;

const main = async () => {
  // setup connection
  new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Project, Upvote, Donation],
    logging: !__prod__,
    synchronize: !__prod__,
  });

  // await dbConnection.runMigrations(); // run migrations

  // init app
  const app = express();
  // redis
  const redisClient = new Redis(process.env.REDIS_URL as string);

  app.set("trust proxy", 1);

  // cors
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  // session MW b4 Apollo
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
      userLoader: createUserLoader(),
      projectLoader: createProjectLoader(),
    }),
    introspection: true,
  });

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(PORT, () =>
    console.log(`### server started on http://localhost:${PORT}/graphql`)
  );
};

// catch error
main().catch((err) => console.error(err));
