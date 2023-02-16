const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: String,
    username: String,
    password: String,
    email: String,
});

const users = mongoose.model("users", userSchema);

module.exports = users;
