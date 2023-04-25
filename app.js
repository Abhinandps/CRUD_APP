const express = require('express')
const app = express()


const userRouter = require('./Routes/userRoutes')
const adminRouter = require('./Routes/adminRoutes')

app.use(express.json())


app.use('/api/v1/user',userRouter)
app.use('/api/v1/admin',adminRouter)


app.get('/', (req, res) => {
    res.send("Welcome")
})


module.exports = app
