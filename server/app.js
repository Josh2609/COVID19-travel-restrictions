'use strict';

const config = require('./config');

const express = require('express')
const app = express()
const port = config.web.port;

const bodyParser = require("body-parser");
const cors = require('cors')

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.set('config', config);

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routes")(app);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))