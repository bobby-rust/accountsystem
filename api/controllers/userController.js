const User = require('../models/User');

/**
 * @description Get all Users
 * @route GET /api/Users 
 */
const getUsers = async (req, res) => {
    const Users = await User.find()
    res.status(200).json(Users)
}

/**
 * @description Create a User
 * @route POST /api/Users
 */
const setUser = async (req, res) => {
    if (!req.body.location) {
        throw new Error("Please provide a location field")
    }
    const newUser = await User.create({
        location: req.body.location
    })
    res.status(200).json(newUser);
}

/**
 * @description Update a User
 * @route PUT /api/User
 */
const updateUser = async (req, res) => {
    const User = await User.findById(req.body.id);

    if (!User) {
        res.status(400);
        throw new Error("User not found")
    }

    const updatedUser = await User.findByIdAndUpdate(req.body.id, req.body)
    res.status(200).json(updatedUser);
}

/**
 * @description Delete a User
 * @route DELETE /api/Users
 */
const deleteUser = async (req, res) => {

    const User = await User.findById(req.body.id);

    if (!User) {
        res.status(400);
        throw new Error("User not found")
    }

    await User.remove();
    res.status(200).json({ id: req.body.id });
}

module.exports = {
  getUsers, 
  setUser,
  updateUser,
  deleteUser
}