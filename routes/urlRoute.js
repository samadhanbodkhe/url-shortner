const { getlongUrl } = require("../controllers/utlController")

const router = require("express").Router()

router
    .get("/:shortUrl", getlongUrl)

module.exports = router