import "reflect-metadata";
import path from "path";

// locals
import { createConnection } from "typeorm";
import { Project } from "./entity/Project";
import { Upvote } from "./entity/Upvote";
import { User } from "./entity/User";

const PORT = process.env.PORT || 6969;

async function Main() {
  // setup connection
  const dbConnection = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [User, Project, Upvote],
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
  });
}
