const { admingetAllUsers, adminUpdateUsers, adminGetUserUrls } = require("../controllers/adminController")

const router = require("express").Router()

router
    .get("/user", admingetAllUsers)
    .put("/user/:userId", adminUpdateUsers)
    .get("/user/url/:userId", adminGetUserUrls)

module.exports = router