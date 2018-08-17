const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
mongoose.connect(process.env.MONGO_DB_URL);
mongoose.connection.once('open', () => {
  console.log('✔️ connected to db');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(5050, () => {
  console.log('✔️ listening for requests on port 5050');
});
