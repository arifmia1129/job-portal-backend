const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/test', () => {
        console.log("Database connection successfully");
    })
}