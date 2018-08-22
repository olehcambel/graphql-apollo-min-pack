const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const app = express();

// cross-origin requests
app.use(cors());

mongoose.connect(
  process.env.MONGO_DB_URL,
  { useNewUrlParser: true }
);
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
