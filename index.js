const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const cookieParser = require("cookie-parser")
const { userProtected, adminProtected } = require("./middlewares/protected")
require("dotenv").config({ path: "./.env" })


//db
mongoose.connect(process.env.MONGO_URL)

const app = express()

//middleware

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.static(path.join(__dirname, "dist")))
//routes

app.use("/api/v1/auth", require("./routes/authRoute"))
app.use("/api/v1/user", userProtected, require("./routes/userRoute"))
app.use("/api/v1/url", require("./routes/urlRoute"))
app.use("/api/v1/admin", adminProtected, require("./routes/adminRoute"))

//404
app.use("*", (req, res) => {
    // res.status(404).json({ message: "Resource not found" })
    res.sendFile(path.join(__dirname, "dist", "index.html"))

})

//error handler
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: err.message || "something went wrong" })
})

//server
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECT")
    app.listen(process.env.PORT, console.log(`SERVER RUNNING:  http://localhost:${process.env.PORT}`))
})
