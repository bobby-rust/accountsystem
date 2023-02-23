const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @description Create a user
 * @route POST /api/users
 */
const setUser = async (req, res) => {
    if (
        !req.body.username ||
        !req.body.id ||
        !req.body.password ||
        !req.body.email
    ) {
        return res.status(400).send({ success: false, message: "Please provide all required fields: id, email, username, password" })
    }

    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            id: req.body.id,
            email: req.body.email,
            username: req.body.username,
            password: hashedPass,
        }).catch(err => { res.status(422).json({ success: false, message: err })});

        if (newUser) {
            const userInfo = {
                _id: newUser._id,
                id: newUser.id,
                email: newUser.email,
                username: newUser.username
            };
    
            res.status(200).json(userInfo);
        }
    } catch (err) {
        console.log(err);
        res.status(422).send({ success: false, message: "Failed to create user" });
    }
};

/**
 * @description Get user given credentials, return non-sensitive user object fields stored in db
 * @route POST /api/users/login
 */
const loginUser = async (req, res) => {
    const _user = await User.find({
        username: req.body.username
    });
    console.log(_user);
    const user = _user[0];

    // Authenticate user
    if (user) {
        try { 
            if (bcrypt.compare(req.body.password, user.password)) {

                const safeUser = {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                };

                jwt.sign({safeUser}, process.env.JWT_SECRET, (err, token) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(token);
                        res.status(200).json({ token, user: safeUser });
                    };
                });
            } else {
                res.status(404).json({ success: false, message: "Invalid credentials" });
            }
        } catch {
            res.status(422).json({ success: false, message: "Unknown error" });
        }
    } else {
        res.status(500).json({ success: false, message: "Unknown error" });
    }
};

/**
 * @description Get all users
 * @route GET /api/users
 */
const getUsers = async(req, res) => {
    const users = await User.find()
    
    return res.status(200).json(users);
}

/**
 * @description Update a user
 * @route PUT /api/users
 */
const updateUser = async (req, res) => {
    const user = await User.findById(req.body._id);

    if (!user) {
        res.status(400).send({ success: false, message: "Could not find user" });
    } else {
        const updatedUser = await User.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json(updatedUser);
    }

};

/**
 * @description Delete a user
 * @route DELETE /api/users
 */
const deleteUser = async (req, res) => {
    const user = await User.findById(req.body._id);

    if (user[0]) {
        await User.deleteOne(user);
        res.status(200).json({ success: true, message: "User successfully deleted", _id: req.body._id });
    } else {
        res.status(418).json({ success: false, message: "Could not find user" });
    }
};

/**
 * @description Find a user by email for forgot password
 * @route POST /api/users/forgotpassword
 */
const forgotPassword = async (req, res) => {
    const user = await User.find({
        email: req.body.email
    })

    if (user[0]) {
        res.status(200).json(user)
    } else {
        res.status(418).json({ success: false, message: "User not found" })
    }
};

module.exports = {
    loginUser,
    getUsers,
    setUser,
    updateUser,
    deleteUser,
    forgotPassword
};