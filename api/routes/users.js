const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const router = express.Router();
const {
    getUsers,
    setUser,
    updateUser,
    deleteUser,
} = require("../controllers/UserController");

mongoose.connect(process.env.DATABASE_URL, () => {
    console.log("Users connected to database");
});

router
    .route("/")
    .get(getUsers)
    .post(setUser)
    .delete(deleteUser)
    .put(updateUser);

module.exports = router;
