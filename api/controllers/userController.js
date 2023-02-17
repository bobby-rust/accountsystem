const User = require("../models/user");

/**
 * @description Get users
 * @route GET /api/users
 */
const getUser = async (req, res) => {
    const user = await User.find({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });

    if (user[0]) {
        res.status(200).json(user);
    } else {
        res.status(400).json({
            success: false,
            message: "User does not exist",
        });
        console.log(user);
    }
};

/**
 * @description Get a user
 * @route GET /api/users
 */

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
        throw new Error(
            "Please provide all required fields: id, username, password, email"
        );
    }

    const newUser = new User({
        id: req.body.id,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });

    newUser.save(function (err) {
        if (err) {
            console.log(err.message);
            return res
                .status(422)
                .send({ success: false, message: err.message });
            // if (err.name === "MongoError" && err.code === "E11000") {
            //     console.log("err.name is MongoError and err.code is E11000")
            //     return res.status(422).send({ success: false, message: 'User already exists' });
            // }
        } else {
            return res.status(200).json(newUser);
        }
    });
};

/**
 * @description Update a user
 * @route PUT /api/user
 */
const updateUser = async (req, res) => {
    const User = await User.findById(req.body.id);

    if (!User) {
        res.status(400);
        throw new Error("User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(req.body.id, req.body);
    res.status(200).json(updatedUser);
};

/**
 * @description Delete a user
 * @route DELETE /api/Users
 */
const deleteUser = async (req, res) => {
    const User = await User.findById(req.body.id);

    if (!User) {
        res.status(400);
        throw new Error("User not found");
    }

    await User.remove();
    res.status(200).json({ id: req.body.id });
};

module.exports = {
    getUser,
    setUser,
    updateUser,
    deleteUser,
};
