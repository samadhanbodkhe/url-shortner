const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const Url = require("../models/Url")

exports.admingetAllUsers = asyncHandler(async (req, res) => {
    const result = await User.find({ role: "user" })
    res.status(200).json({ message: "user fetch success", result })
})

exports.adminUpdateUsers = asyncHandler(async (req, res) => {
    const { userId } = req.params
    await User.findByIdAndUpdate(userId, { ...req.body, role: "user" }, { runValidators: true })
    // const result = await User.find()
    res.status(200).json({ message: "user update success" })
})

exports.adminGetUserUrls = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const result = await Url.find({ userId })
    // const result = await User.find()
    res.status(200).json({ message: "user url fetch success", result })
})

