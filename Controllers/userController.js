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


exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email, password })

        if (!user) {
            throw Error()
        }
        else {
            res.status(200).json({
                status: 'success',
                message: 'user login successfully'
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid Login Credential'
        })
    }
}




