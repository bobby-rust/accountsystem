const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true, dropDups: true },
    email: { type: String, unique: true, required: true, dropDups: true },
    username: { type: String, unique: true, required: true, dropDups: true },
    password: { type: String, unique: true, required: true, dropDups: true },
});

const users = mongoose.model("users", userSchema);

module.exports = users;
