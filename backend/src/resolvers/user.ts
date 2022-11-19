import argon2 from "argon2";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import crypto from "node:crypto";
import { sendEmail } from "../utils/sendEmail";
import { MyContext } from "../types/MyContext";
import { UserResponse } from "../types/UserTypes";
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from "../utils/constants";
import { EmailPasswordInput } from "../utils/EmailPasswordInput";
import { ValidateRegister } from "../utils/ValidateRegister";
import { User } from '@generated/type-graphql'

@Resolver(User)
export class UserResolver {
  // REGISTER
  @Mutation(() => UserResponse, { nullable: true })
  async register(
    @Arg("options") options: EmailPasswordInput,
    @Ctx() { req, prisma }: MyContext
  ): Promise<UserResponse> {
    // validation stuff
    const errors = ValidateRegister(options);
    if (errors) return { errors };
    const existingUser = await prisma.user.findFirst({
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
      user = await prisma.user.create({
        data: {
          avatarUrl: "",
          cust_id: "",
          email: options.email,
          fullName: options.fullName,
          password: hashpass,
        }
      })
    } catch (err) {
      console.log("message: ", err.message);
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
    }
    if (!user) {
      return { errors: [
        {
          field: 'feedback',
          message: "Something went wrong, please try again later."
        }
      ]}
    }
    // set cookies
    req.session.userId = user.id;
    console.log("### Register is  G2G");
    return { user };
  }

  // LOGIN
  @Mutation(() => UserResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req, prisma }: MyContext
  ): Promise<UserResponse> {
    const user = await prisma.user.findFirst({ where: { email: email } });

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
    @Ctx() { redis, prisma }: MyContext
  ): Promise<Boolean> {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      // the email is not in the DB
      // but we'// still send true
      return true;
    }

    const token = crypto.randomUUID();

    try {
        await redis.set(
          FORGOT_PASSWORD_PREFIX + token,
          user.id,
          "EX",
          1000 * 60 * 60 * 24 * 3 // days
        );

        // send the email
        await sendEmail(
          email,
          `<a href="${process.env.CORS_ORIGIN}/change-password/${token}">reset password</a>`,
          "Change Password Requested"
        );
    
        return true;
    } catch (error) {
      console.log(error)
      return false
    }
  }

  // GETBY USERID
  @Mutation(() => UserResponse)
  async getUserById(@Arg("id", () => Int) id: number, 
  @Ctx() { prisma }: MyContext): Promise<UserResponse> {
    const user = await prisma.user.findFirst({ where: { id }});
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
  async me(@Ctx() { req, prisma }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }
    // all good
    return prisma.user.findFirst({ where: { id: req.session.userId } });
  }
}
