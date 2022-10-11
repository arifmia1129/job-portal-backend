const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

module.exports = () => {
    mongoose.connect(process.env.DB_URL, () => {
        console.log("Database connection successfully");
    })
}