import argon2 from "argon2";
import { sendEmail } from "../utils/sendEmail";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { v4 } from "uuid";
import { User } from "../entity/User";
import { MyContext } from "../types/MyContext";
import { UserResponse } from "../types/UserTypes";
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from "../utils/constants";
import { EmailPasswordInput } from "../utils/EmailPasswordInput";
import { ValidateRegister } from "../utils/ValidateRegister";

@Resolver(User)
export class UserResolver {
  // REGISTER
  @Mutation(() => UserResponse, { nullable: true })
  async register(
    @Arg("options") options: EmailPasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    // validation stuff
    const errors = ValidateRegister(options);
    if (errors) return { errors };
    const existingUser = await User.findOne({
      where: { email: options.email },
    });

    if (existingUser) {
      return {
        errors: [
          {
            field: "email",
            message: "Email is taken.",
          },
        ],
      };
    }

    // g2g
    const hashpass = await argon2.hash(options.password);

    let user;
    try {
      const res = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          email: options.email,
          fullName: options.fullName,
          password: hashpass,
        })
        .returning("*")
        .execute();

      user = res.generatedMaps[0];
    } catch (err) {
      if (err.code === "23505" || err.detail.includes("already exists")) {
        // duplicate username error
        return {
          errors: [
            {
              field: "email",
              message: "Email is taken.",
            },
          ],
        };
      }
      console.log("message: ", err.message);
    }
    // set cookies
    //@ts-ignore
    req.session.userId = user.id;
    console.log("### G2G");
    //@ts-ignore
    return { user };
  }

  // LOGIN
  @Mutation(() => UserResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    // console.log(email, password);
    const user = await User.findOne({ where: { email: email } });
    // console.log("user: ", user);

    // oops, didn't find anything
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "That user doesn't exist.",
          },
        ],
      };
    }
    // check password
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password.",
          },
        ],
      };
    }
    // all good, login
    req.session.userId = user.id;
    console.log("## LOGIN ### Cookie Set");

    return { user };
  }

  // LOGOUT
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      req.session.destroy((err: any) => {
        // destroy cookie!!
        res.clearCookie(COOKIE_NAME);
        // check for errors
        if (err) {
          console.error(err);
          resolve(false);
          return;
        }
        // all good
        resolve(true);
      });
    });
  }

  // FORGOT PASSWORD
  @Mutation(() => Boolean) // decorator
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // the email is not in the DB
      // but we'// still send true
      return true;
    }

    const token = v4();

    await redis.set(
      FORGOT_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    );

    // send the email
    sendEmail(
      email,
      `<a href="${process.env.CORS_ORIGIN}/change-password/${token}">reset password</a>`,
      "Change Password Requested"
    );

    return true;
  }

  // GETBY USERID
  @Mutation(() => UserResponse)
  async getUserById(@Arg("id", () => Int) id: number): Promise<UserResponse> {
    const user = await User.findOne(id);
    // oops, didn't find anything
    if (!user) {
      return {
        errors: [
          {
            field: "error",
            message: "That user doesn't exist.",
          },
        ],
      };
    }
    // TODO if not user only return certain data
    return {
      user,
    };
  }

  // GET ME-self foo!
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    // all good
    return User.findOne({ id: req.session.userId });
  }
}
