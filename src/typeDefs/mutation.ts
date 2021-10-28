import { gql } from "apollo-server";

export const mutation = gql`
  type Mutation {
    signupUser(name: String!, email: String!, password: String!): AuthPayload!
  }
`;
