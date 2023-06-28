const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const middleware = [
    morgan("combined"),
    cors({ origin: process.env.CLIENT_SIDE_URL }),
    bodyParser.urlencoded({ urlencoded: true }),
    bodyParser.json(),
];

module.exports = middleware;
