require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");
const app = express();

const port = 8000;

mongoose.connect(process.env.DB_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.off("error", (err) => {
  console.log("Error : ", err);
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(port, () => {
  console.log("Server running http://localhost:" + port);
});
