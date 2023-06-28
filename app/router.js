const route = require("express").Router();

//health route
route.get("/health", (_req, res) => {
    res.status(200).json({ message: "Success!" });
});

module.exports = route;
