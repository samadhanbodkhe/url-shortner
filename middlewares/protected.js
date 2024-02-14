const asyncHandler = require("express-async-handler")
const JWT = require("jsonwebtoken")
const User = require("../models/User")

exports.userProtected = asyncHandler(async (req, res, next) => {
    const token = req.cookies.devAuth
    if (!token) {
        return res.status(401).json({ message: "No Cookie Found" })
    }
    JWT.verify(token, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: err.message || "JWT Error" })
        }
        req.body.userId = decode.userId
        next()
    })
})

exports.adminProtected = asyncHandler(async (req, res, next) => {
    const token = req.cookies.devAuth
    if (!token) {
        return res.status(401).json({ message: "No Cookie Found" })
    }
    JWT.verify(token, process.env.JWT_KEY, async (err, decode) => {
        if (err) {
            return res.status(401).json({ message: err.message || "JWT Error" })
        }
        const result = await User.findById(decode.userId)
        if (!result || result.role !== 'admin') {
            return res.status(401).json({ message: "Admin Only Route" })
        }
        req.body.userId = decode.userId
        next()
    })
})