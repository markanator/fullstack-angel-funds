import { MyContext } from "src/types/MyContext";
import { ID, MiddlewareFn } from "type-graphql";

export const isAuthed: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("Not Athenticated!");
  }

  // gucci
  return next();
};
