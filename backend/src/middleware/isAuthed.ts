import { MyContext } from "src/types/MyContext";
import { MiddlewareFn } from "type-graphql";

export const isAuthed: MiddlewareFn<MyContext> = ({ context }, next) => {
  console.log("## Session Check:: ", context.req.session);
  if (!context.req.session.userId) {
    console.warn("NOT AUTHENTICATED");
    throw new Error("Not Athenticated!");
  }
  console.log("### G2G", context.req.session);

  // g2g
  return next();
};
