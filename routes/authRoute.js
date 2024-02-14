const { register, login, logout } = require("../controllers/authController")

const router = require("express").Router()

router
    .post("/register", register)
    .post("/login", login)
    .post("/logout", logout)

module.exports = router