import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entity/User";
import { MyContext } from "../types/MyContext";
import { EmailPasswordInput } from "../utils/EmailPasswordInput";
import { ValidateRegister } from "../utils/ValidateRegister";
import argon2 from "argon2";
import { getConnection } from "typeorm";
import { COOKIE_NAME } from "../utils/constants";

@ObjectType() //can return
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType() //can return
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  // REGISTER
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: EmailPasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    // validation stuff
    const errors = ValidateRegister(options);
    if (errors) return { errors };
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

      user = res.raw[0];
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
    req.session.userId = user.id;

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

  // GETBY USERID
  @Mutation(() => UserResponse)
  async getUserById(@Arg("id") id: number): Promise<UserResponse> {
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
