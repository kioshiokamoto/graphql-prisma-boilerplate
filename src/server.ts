import { ApolloServer } from "apollo-server";
import { createContext } from "./context";
import { makeExecutableSchema } from "graphql-tools";

import { mutation } from "./typeDefs/mutation";
import { query } from "./typeDefs/query";
import { user } from "./typeDefs/user";

import { resolvers } from "./schema";

import * as dotenv from "dotenv";
dotenv.config();

const schema = makeExecutableSchema({
  typeDefs: [mutation, query, user],
  resolvers,
});

new ApolloServer({
  schema,
  context: createContext,
}).listen({ port: process.env.PORT }, () =>
  console.log(`✔ Sever is running on: http://localhost:5000`)
);
