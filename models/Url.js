const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true
    },
    longUrl: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    count: {
        type: Number,
        default: 0
    },
    label: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("url", urlSchema)