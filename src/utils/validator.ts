import { sign, verify } from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import { ApolloError } from "apollo-server-express";
import { compareSync } from "bcryptjs";
import { IUserDocument } from "../interfaces/user.interfaces";

const validateRegisterInput = async function ({
  username,
  password,
  confirmPassword,
}) {
  const errors: any = {};

  // Check Username
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  // Check Password
  if (password.trim() === "") {
    errors.password = "password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  const userArgs = { username, password };

  return {
    userArgs,
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const generateToken = async function (user) {
  return await sign(
    {
      username: user.username,
    },
    "secret",
    { expiresIn: "1h" },
  );
};

const signJWT = async function (data: object) {
  return await sign(data, "secret", { exp: "1h" });
};

const validateLoginInput = async function (
  username: string,
  password: string,
): Promise<any> {
  const errors: any = {};
  console.log(username, password);

  if (username.trim() === "") {
    errors.username = " Username must not be empty";
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  const user = await UserModel.findOne({ username: username });

  console.log("USER: ", user);

  // User?

  if (!user) {
    errors.username = "User not Found?";
  }
  // Password?

  if (!compareSync(password, user.password)) {
    errors.password = "Password Don't Match?";
  }

  //verify token
  const token = await signJWT(user);

  return {
    user,
    token,
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export { validateRegisterInput, generateToken, validateLoginInput };
