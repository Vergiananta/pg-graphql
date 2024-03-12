import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { UserResolver } from "./resolvers/user_resolver";

async function runServer() {
  const connection = await createConnection();
  const schema = await buildSchema({
    resolvers: [UserResolver],
    validate: false,
  });

  const server = new ApolloServer({ schema });
  await server.listen(4000);
  console.log("Server is runnon on http://localhost:4000");
}

runServer();
