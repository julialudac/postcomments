const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(express.json()); 
app.use(cors());

let configFile = process.argv[2] || "base.env.json";
configFile = "./config/" + configFile;
const config = require("./config.js");
config.init(configFile);

const posts = require('./routes/api/posts');
app.use('/api/posts', posts); // the useful part

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
