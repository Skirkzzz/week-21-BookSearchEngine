const express = require("express");

//add appollo
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const db = require("./config/connection");
//const routes = require("./routes");
//add resolvers and typedefs
const { typeDefs, resolvers } = require("./routes/schemas/index");

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

//app.use(routes);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const initiateApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
};

db.once("open", () => {
  app.listen(process.env.PORT || 8080, () =>
    console.log(`🌍 Now listening on localhost:${PORT}`)
  );
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});

initiateApolloServer(typeDefs, resolvers);
