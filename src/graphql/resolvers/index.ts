import userResolver from "./users";

const rootResolver = {
  Query: {
    root: () => true,
  },
};

export default [rootResolver, userResolver];
