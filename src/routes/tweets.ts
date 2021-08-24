import { Router } from "express";
import TweetsDatasources from "../dataSources/tweets.datasource";
import { verify } from "jsonwebtoken";

const router = Router();
const tweets = new TweetsDatasources();

const validateToken = async (token) => {
  return await verify(token, "secret");
};

//CREATE TWEET
router.post("/create", async (req, res) => {
  const { body } = req.body;
  const { token } = req.headers;

  try {
    const isValid = await validateToken(token);
  } catch (e) {
    res.status(401).send(e);
  }

  const args = { body, token };
  const createTweet = await tweets.createTweet({ args });

  if (createTweet) {
    res.status(200).send(createTweet);
  } else {
    res.status(400).send("ERROR/ ERROR/ERROR");
  }
});

//UPDATE TWEET
router.post("/update", async (req, res) => {
  const { id, tweetArgs } = req.body;
  const { token } = req.headers;

  try {
    const isValid = await validateToken(token);
  } catch (e) {
    res.status(401).send(e);
  }

  const updateTweet = await tweets.updateTweet({
    id,
    body: tweetArgs,
    token,
  });

  if (updateTweet) {
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

//DELETE TWEET
router.post("/delete", async (req, res) => {
  const { tweet_id } = req.body;
  const { token } = req.headers;

  try {
    const isValid = await validateToken(token);
  } catch (e) {
    res.status(401).send(e);
  }

  const deleteTweet = await tweets.deleteTweet(tweet_id, token);

  if (deleteTweet) {
    res.status(200).send(deleteTweet);
  } else {
    res.status(400).send("ERROR DELETING TWEET");
  }
});

// QUERY ALL
router.get("/all", async (req, res) => {
  const getTweets = await tweets.getTweets();
  res.status(200).send(getTweets);
});

//QUERY BY USER
router.get("/byuser", async (req, res) => {
  const { username } = req.body;
  const getUserTweets = await tweets.getTweetsByUser(username);
  res.status(200).send(getUserTweets);
});

export default router;
