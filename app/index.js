require("dotenv").config("./../.env");
const express = require("express");
const middleware = require("./middleware");
const { notfound, globalError } = require("./error");

const app = express();

app.use(middleware);
app.use(require("./router"));
app.use(notfound);
app.use(globalError);

module.exports = app;
