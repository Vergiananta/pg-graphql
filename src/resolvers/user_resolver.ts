import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../models/user";
import { CreateUserInput } from "../inputs/create_user_input";
import { UpdateUserInput } from "../inputs/update_user_input";

@Resolver()
export class UserResolver {
  // get all the users
  @Query(() => [User])
  users() {
    return User.find();
  }

  // create new user
  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput) {
    const user = User.create(data);
    await user.save();
    return user;
  }

  // get single user via id
  @Query(() => User)
  user(@Arg("id") id: string) {
    return User.findOne({ where: { id } });
  }

  //update user
  @Mutation(() => User)
  async updateUser(@Arg("id") id: string, @Arg("data") data: UpdateUserInput) {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new Error(`The User with ${id} does not exist`);
    }

    Object.assign(user, data);
    await user.save();
    return user;
  }

  // delete user
  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string) {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new Error(`The User with ${id} does not exist`);
    }

    await user.remove();
    return true;
  }
}
