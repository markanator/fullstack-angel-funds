import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
// locals
import { createConnection } from "typeorm";
import { createUserLoader } from "./dataloaders";
import { Donation, Project, Upvote, User } from "./entity";
import {
  DonationResolver,
  HelloResolver,
  ProjectResolver,
  UserResolver,
} from "./resolvers";
import { COOKIE_NAME, __prod__ } from "./utils/constants";

dotenv.config();

const PORT = process.env.PORT || 7777;

const main = async () => {
  // setup connection
  const dbConnection = await createConnection({
    name: "default",
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    // url: process.env.DATABASE_URL,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User, Project, Upvote, Donation],
    logging: true,
    synchronize: true,
  });

  // await dbConnection.runMigrations(); // run migrations

  // init app
  const app = express();
  // redis
  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
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
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 1, // 1 yrs
        httpOnly: true, // non secure for dev
        sameSite: "lax", // csrf protections
        secure: __prod__, //cookie only works in https
        domain: __prod__ ? ".ambrocio.dev" : undefined, // don't need?
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
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
    // deconstruct access
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
    }),
  });

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
