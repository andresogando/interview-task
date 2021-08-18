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
      console.log("LOGIN: ", username, password);
      const { user, valid, token, errors } = await validateLoginInput(
        username,
        password,
      );

      // const { valid, errors, token, user } = loginParams;

      if (!valid) {
        throw new ApolloError("Errors: ", { ...errors });
      }

      if (user) {
        user.lastLogin = Date.now();
        await user.save();
      }

      const Session = {
        token,
        currentUser: { id: user.id, username },
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
    },
  },
  Subscription: {},
};

export default userResolver;
