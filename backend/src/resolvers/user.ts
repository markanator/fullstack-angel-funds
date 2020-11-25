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

@ObjectType() //can return
class FieldError {
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
  @Query(() => String)
  hellerrrr() {
    return "Hello world from the resolver!";
  }

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

  @Mutation(() => UserResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(email);
    // oops, didn't find anything
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "that username doesn't exist",
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

    return { user };
  }
}
