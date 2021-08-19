import { Router } from "express";
import UserDatasources from "../dataSources/user.datasource";
import { validateRegisterInput } from "../utils/validator";

const router = Router();
const users = new UserDatasources();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const response = await users.login(username, password);

  if (response) {
    return res.status(200).send(response);
  }
  res.status(404).send("User/Password are incorrect or User does not Exist!");
});

// create user
router.post("/create", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  const userCheck = await validateRegisterInput({
    username,
    password,
    confirmPassword,
  });

  if (!userCheck.valid) {
    res.send(userCheck.errors);
  }

  const newUser = await users.createUser(userCheck.userArgs);

  if (newUser) {
    res.status(200).send(newUser);
  } else {
    res.status(100).send("USER ALREADY EXIST!");
  }
});

router.get("/get", async (req, res) => {
  const getUsers = await users.getUsers();

  res.send(getUsers);
});

export default router;
