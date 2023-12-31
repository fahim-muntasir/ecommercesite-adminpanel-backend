const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
//origin: process.env.CLIENT_SIDE_URL
const middleware = [
    express.json(),
    express.urlencoded({ extended: true }),
    morgan("combined"),
    cors({ origin: "*" }),
];

module.exports = middleware;
