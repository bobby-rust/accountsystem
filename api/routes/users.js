const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const router = express.Router();
const {
    getUsers,
    loginUser,
    forgotPassword,
    setUser,
    updateUser,
    deleteUser,
} = require("../controllers/UserController");

mongoose.connect(process.env.DATABASE_URL, () => {
    console.log("Users connected to database");
});

router.route("/").get(getUsers).post(setUser).delete(deleteUser).put(updateUser);
router.route("/login").post(loginUser);
router.route("/forgotpassword").post(forgotPassword);

module.exports = router;
