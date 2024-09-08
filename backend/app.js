require("dotenv").config();
const express = require("express");

const app = express();
const cors = require("cors");

// Router & Middleware
const cmsRouter = require('./routes/cms');
const customerRouter = require('./routes/customer');
const errorHandler = require('./middleware/errorHandler');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => res.send('Welcome to AeroBnB API entrypoint'));
app.use('/cms', cmsRouter);
app.use('/pub', customerRouter);
app.use(errorHandler);

module.exports = app;