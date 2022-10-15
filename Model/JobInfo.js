const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const jobInfoSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Job title is required"],
        minLength: 5,
        maxLength: 100,
        trim: true
    },
    description: String,
    salary: {
        type: Number,
        min: 4,
        required: true,
        trim: true
    },
    hiringManager: {
        name: String,
        email: {
            type: String,
            validate: [validator.isEmail, "Provide a valid email"]
        },
        id: {
            type: ObjectId,
            ref: "User"
        }
    },
    location: {
        type: String,
        required: true,
        lowercase: true
    },
    jobType: {
        type: String,
        enum: {
            values: ["programmer", "manager", "designer", "others"],
            message: "{VALUE} is not a valid job type."
        }
    },
    deadline: String
})

const JobInfo = mongoose.model("JobInfo", jobInfoSchema);

module.exports = JobInfo;