const User = require("../Models/userModel")


exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body)

        res.status(201).json({
            status: "success",
            data: {
                data: newUser
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id
    next();
  };

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        res.status(201).json({
            status: "success",
            data: {
                data: user
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}






