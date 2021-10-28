import { Context } from "./model/appInterface";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
export const resolvers = {
  Query: {
    me: () => {
      return "Hola!";
    },
  },
  Mutation: {
    signupUser: async (_, args, ctx: Context) => {
      const userExists = await ctx.prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      if (userExists) {
        throw new Error("User Already exists");
      }
      const password = await bcrypt.hash(args.password, 6);

      const user = await ctx.prisma.user.create({
        data: {
          name: args.name,
          password: password,
          role: "USER",
          email: args.email,
        },
      });

      return {
        user,
        token: jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
          expiresIn: "2d",
        }),
      };
    },
  },
};
