const express = require('express');

const app = express();

app.listen(5050, () => {
  console.log('listening for requests on port 5050');
});
