import { ApolloError } from "apollo-server-express";
import { UserModel } from "../../models/user.model";
import { hash } from "bcryptjs";
import {
  generateToken,
  validateLoginInput,
  validateRegisterInput,
} from "../../utils/validator";

const userResolver = {
  Query: {},
  Mutation: {
    login: async (_, { username, password }) => {
      const { valid, errors, user, token } = validateLoginInput(
        username,
        password,
      );

      if (!valid) {
        throw new ApolloError("Errors: ", { ...errors });
      }

      if (user) {
        user.lastLogin = Date.now();
        await user.save();
      }

      const Session = {
        token,
        currentUser: { id: user.id, username: user.username },
      };
      return { Session };
    },

    register: async (
      _,
      { registerInput: { username, password, confirmPassword } },
    ) => {
      console.log(username, password, confirmPassword);

      const { valid, errors } = validateRegisterInput({
        username,
        password,
        confirmPassword,
      });

      if (!valid) {
        throw new ApolloError("Error: ", { ...errors });
      }

      const user = await UserModel.findOne({ username: username });
      if (user) {
        throw new ApolloError(
          ` Error:  Username: [ ${user.username} ] its already taken!`,
        );
      }

      // Hash the password & create JWT token
      password = await hash(password, 12);
      const token = await generateToken(username);

      const newUser = await UserModel.create({
        username,
        password,
        token,
        createdAt: new Date().toISOString(),
      });
      newUser.save();

      console.log({ newUser });

      return newUser;
    },
  },
  Subscription: {},
};

export default userResolver;
