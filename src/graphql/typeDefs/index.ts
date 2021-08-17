import user from "./user";
import gql from "graphql-tag";

const root = gql`
  scalar Date
  scalar JSON
  scalar JSONObject

  type Query {
    root: Boolean
  }

  type Mutation {
    root: Boolean
  }

  type Subscription {
    root: Boolean
  }
`;

export default [root, user];
