import { Router } from "express";
import UserDatasources from "../graphql/dataSources/user.datasource";
import { validateRegisterInput } from "../utils/validator";

const router = Router();
const users = new UserDatasources();

router.post("/create", async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  const { valid, errors, userArgs } = validateRegisterInput({
    username,
    password,
    confirmPassword,
  });

  if (!valid) {
    throw new Error(errors);
  }

  users.createUser(userArgs);

  res.send(newUser);
});

router.get("/get", async (req, res) => {
  const getUsers = await users.getUsers();

  res.send(getUsers);
});

export default router;
