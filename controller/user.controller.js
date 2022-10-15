const { signupService, loggedInUser, getMeService } = require("../services/user.service");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res) => {
    try {
        const result = await signupService(req.body);
        res.status(200).json({
            status: "success",
            message: "Successfully created user"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't create the user",
            error: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "email or password missing"
            })
        }

        const user = await loggedInUser(email);

        if (!user) {
            return res.status(400).json({
                status: "fail",
                message: "not found user"
            })
        }


        const isValidPassword = user.comparePassword(password, user.password);

        if (!isValidPassword) {
            return res.status(400).json({
                status: "fail",
                message: "email or password invalid"
            })
        }

        if (user.status != "active") {
            return res.status(400).json({
                status: "fail",
                message: "User not active"
            })
        }

        const token = generateToken(user);

        const { password: pwd, ...others } = user.toObject();

        res.status(200).json({
            status: "success",
            message: "Successfully logged in",
            data: {
                user: others,
                token
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't logged in",
            error: error.message
        })
    }
}


exports.getMe = async (req, res) => {
    try {
        const user = await getMeService(req?.user?.email);
        const { password, ...others } = user.toObject();
        res.status(200).json({
            status: "success",
            message: "Successfully get user",
            user: others
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get user",
            error: error.message
        })
    }
}


