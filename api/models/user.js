const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: String,
    email: String,
    username: String,
    password: String,
});

const users = mongoose.model("users", userSchema);

module.exports = users;
