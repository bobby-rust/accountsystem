const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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

    // No auth header was sent
    if (typeof bearerToken === "undefined") return res.sendStatus(401);

    // Verify token and pass to next layer
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, user) => {
        // 403 Forbidden
        if (err) return res.sendStatus(403);

        // Add decoded user info to request
        req.user = user;

        // Pass to next layer
        next();
    });
};

mongoose.connect(process.env.DATABASE_URL, () => {
    console.log("Users connected to database");
});

// Protected routes
router.route("/").delete(verifyToken, deleteUser).put(verifyToken, updateUser);
router.route("/forgotpassword").post(verifyToken, forgotPassword);

// Unprotected routes
router.route("/").get(getUsers).post(setUser);
router.route("/login").post(loginUser);

module.exports = router;