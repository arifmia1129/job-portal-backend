const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");
const bcrypto = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    description: String,
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, "Please provide a valid mail address"]
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => validator.isStrongPassword(value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })
        }
    },
    confirmPassword: {
        type: String,
        require: true,
        validate: {
            validator: function (value) {
                return value == this.password;
            },
            message: "password didn't match"
        },
    },

    role: {
        type: String,
        enum: {
            values: ["candidate", "hiring-manager", "admin"],
            message: "{VALUE} isn't valid role. Role must be candidate/hiring-manager/admin"
        },
        default: "candidate"
    },
    status: {
        type: String,
        enum: {
            values: ["active", "inactive", "blocked"],
        },
        default: "active"
    },
    confirmationToken: String,
    confirmationTokenExpireAt: Date
})


userSchema.pre("save", function (next) {
    const password = this.password;
    const hashedPassword = bcrypto.hashSync(password);
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next();
})


userSchema.methods.comparePassword = function (pass, hash) {
    const isValidPassword = bcrypto.compareSync(pass, hash);
    return isValidPassword;
}


const User = mongoose.model("User", userSchema);

module.exports = User;