const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
mongoose.set("strictQuery", false);
const User = require("./models/user");

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
