require("dotenv").config();
const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const DBConnect = require("./db/db_connection");
const userRouter = require("./routers/routes");

// database connection and app run
DBConnect()
    .then(() => {
        console.log("DB connection successfull.");
        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
    })
    .catch((e) => console.log(e));
