const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
mongoose.set("strictQuery", false);

/**
 * The following fixes a CORS issue
 * See https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
 */
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", error => {
    console.log(error);
});
db.once("open", () => {
    console.log("Server connected to database");
});

app.use(express.json());
const usersRouter = require("./routes/users");

app.use("/api/users", usersRouter);

app.listen(4000, () => {
    console.log("server started");
});
