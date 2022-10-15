module.exports = (...role) => {
    return (req, res, next) => {
        if (!role.includes("hiring-manager")) {
            return res.status(401).json({
                status: "fail",
                message: "Unauthorized request"
            })
        }
        next();
    }
}