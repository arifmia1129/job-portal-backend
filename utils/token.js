const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
    const payload = {
        email: user?.email,
        role: user?.role
    }
    const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
        expiresIn: "1d"
    })
    return token;
}