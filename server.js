const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')
dotenv.config({ path: './config.env' })



mongoose.connect(process.env.DATABASE_LOCAL, {}).then(() => console.log("DB Connection successful"))

const PORT = process.env.PORT || 4000


app.listen(PORT, () => {
    console.log(`App Listening to http://localhost:${PORT}`)
})