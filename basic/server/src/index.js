const { GraphQLServer } = require("graphql-yoga");

const { connectToDB } = require("./db/connection");
const dbSchema = require("./db/schema");
const gqSchema = require("./graphql/schema");

const server = new GraphQLServer({
  schema: gqSchema,
  context: req => ({
    ...req,
    db: dbSchema
  })
});

const dbConnectAndStartServer = (async () => {
  try {
    await connectToDB();
    console.log("Connected to Mongo successfully");
    server.start(() =>
      console.log(`The server is running on http://localhost:4000`)
    );
  } catch (err) {
    console.error(`Error connecting to mongo - ${err.message}`);
    process.exit(1);
  }
})();
