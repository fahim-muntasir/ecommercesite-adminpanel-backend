const mongoose = require("mongoose");

const DBConnect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017", {
        dbName: "role_base_dashboard",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = DBConnect;
