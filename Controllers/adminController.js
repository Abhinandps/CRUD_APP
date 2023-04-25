const User = require("../Models/userModel")

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const admin = await User.findOne({ email, password, isAdmin: true })
        if (!admin) {
            throw Error()
        }
        else {
            res.status(200).json({
                status: 'success',
                message: 'login successfully'
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid Login Credentials'
        })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({
            status: 'success',
            result: users.length,
            data: { users }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}


exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({
            status: 'success',
            data: { user }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}


exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: 'success',
            data: { user }
        })

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}
