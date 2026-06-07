import "reflect-metadata";
import { writeFileSync } from "fs";
import path from "path";
import { buildSchema } from "type-graphql";
import { printSchema } from "graphql";
import {
  DonationResolver,
  HelloResolver,
  ProjectResolver,
  RewardsResolver,
  UserResolver,
} from "../src/resolvers";

async function main() {
  const schema = await buildSchema({
    resolvers: [
      HelloResolver,
      ProjectResolver,
      UserResolver,
      DonationResolver,
      RewardsResolver,
    ],
    validate: false,
  });
  const out = path.resolve(__dirname, "../schema.graphql");
  writeFileSync(out, printSchema(schema));
  console.log("Wrote SDL to", out);
}

main().then(() => process.exit(0)).catch((e) => {
  console.error(e);
  process.exit(1);
});
