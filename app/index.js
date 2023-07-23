require("dotenv").config("./../.env");
const express = require("express");
const middleware = require("./middleware");
const { notfound, globalError } = require("./error");
const path = require("path");

const app = express();

app.use(middleware);
app.use(require("./router"));
app.use("/api/", require("../routers/routes"));
app.use('/uploads', express.static(path.resolve(__dirname, '../public/uploads')));
app.use(notfound);
app.use(globalError);


module.exports = app;
