const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const User = require("../models/user");
const router = express.Router();
const {
    getUsers,
    loginUser,
    forgotPassword,
    setUser,
    updateUser,
    deleteUser,
} = require("../controllers/UserController");

const verifyToken = (req, res, next) => {
    // Extract token from headers
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader && authHeader.split(" ")[1];

    // No header was sent
    if (typeof bearerToken === "undefined") return res.sendStatus(401);

    // Verify token and pass to next layer
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

mongoose.connect(process.env.DATABASE_URL, () => {
    console.log("Users connected to database");
});

router.route("/").get(getUsers).post(setUser).delete(verifyToken, deleteUser).put(verifyToken, updateUser);
router.route("/login").post(loginUser);
router.route("/forgotpassword").post(verifyToken, forgotPassword);

module.exports = router;
