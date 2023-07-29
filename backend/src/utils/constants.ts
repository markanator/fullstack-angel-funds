import type { SessionOptions } from "express-session";

export const __prod__ = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "angl_funds";
export const FORGOT_PASSWORD_PREFIX = "forgot-password:";
export const CURRENCY = "usd";
export const MIN_AMOUNT = 1.0;

const WHITE_LIST = ["*", process.env.CORS_ORIGIN!, process.env.CORS_STUDIO!];
export const CORS_OPTIONS = {
  origin: WHITE_LIST,
  credentials: true,
};
// new RedisStore({ client: redisClient, disableTouch: true })
export const SESSION_CONFIG = (store: any): SessionOptions => ({
  name: COOKIE_NAME,
  store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 1, // 1 yrs
    httpOnly: true,
    sameSite: !__prod__ ? "lax" : "none", // csrf protections
    secure: __prod__, //cookie only works in https
    domain: __prod__ ? ".markambrocio.com" : undefined,
  },
  saveUninitialized: false, // create sesh by default regardless of !data
  secret: process.env.SESSION_SECRET as string,
  resave: false,
});
