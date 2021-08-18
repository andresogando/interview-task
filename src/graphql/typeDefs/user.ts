import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: ID!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
  }

  type CurrentUser {
    id: ID
    username: String
  }

  type Session {
    id: ID
    token: String
    currentUser: CurrentUser
  }

  type Query {
    getUsers: [User]
  }

  type Mutation {
    register(registerInput: RegisterInput!): User!
    login(username: String!, password: String!): Session
  }
`;
