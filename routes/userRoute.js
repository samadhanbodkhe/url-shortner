const { getUserUrl, addUrl, updateUserUrl, deleteUserUrl } = require("../controllers/userController")

const router = require("express").Router()

router
    .get("/url", getUserUrl)
    .post("/url-create", addUrl)
    .put("/url-update/:urlId", updateUserUrl)
    .delete("/url-remove/:urlId", deleteUserUrl)

module.exports = router