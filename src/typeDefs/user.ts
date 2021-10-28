import { gql } from "apollo-server";

export const user = gql`
  type User {
    email: String!
    id: ID!
    name: String
    role: Role
  }
  enum Role {
    ADMIN
    USER
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;
